import React from 'react';
import Square from './Square';
import Marks from './Marks';
import styled from 'styled-components';

interface BoardProps {
    onWinner(winner: number):void
}

interface BoardState {
    squares: Array<number>;
    turn: number;
    gameOver: boolean;
    winningSquares: Array<number> | null;
    history: Array<BoardState>;
}

const DEFAULT_STATE = {
    squares: Array(9).fill(null),
    turn: 0,
    gameOver: false,
    winningSquares: null,
    history: [],
};

const StyledBoardRow = styled.div`
    &:after {
        clear: both;
        content: "";
        display: table;
    }
`;

const StyledStatus = styled.div`
    height: 30px;
    margin-bottom: 10px;
`;

class Board extends React.Component<BoardProps, BoardState> {

    public constructor(props: BoardProps) {
        super(props);
        this.state = {...DEFAULT_STATE, history:[{...DEFAULT_STATE}]};
    }

    private setDefaultState() {
        this.setState({...DEFAULT_STATE, history:[{...DEFAULT_STATE}]});
    }

    private handleClick(i: number) {
        if (this.state.squares[i] !== null) return; // No-op if the square is already taken
        const squares: Array<number> = this.state.squares.slice();
        if (this.state.gameOver) return;
        squares[i] = this.state.turn;
        const winnerData = this.calculateWinner(squares);
        let winningSquares = null;
        if (winnerData !== null) {
            this.props.onWinner(winnerData.winner);
            winningSquares = winnerData.winningSquares;
        }
        let history = this.state.history.slice() as Array<BoardState>;
        const state = {
            squares: squares,
            turn: (this.state.turn === Marks.X) ? Marks.O : Marks.X,
            gameOver: (winnerData !== null) ? true : false,
            winningSquares: winningSquares,
            history: history};
        history.push(state);
        this.setState(state);
    }

    private renderSquare(i: number) {
        const winningSquare: boolean = (this.state.gameOver && this.state.winningSquares?.includes(i)) ? true : false;
        return (<Square
                    value={this.state.squares[i]}
                    winningSquare={winningSquare}
                    onClick={() => this.handleClick(i)}/>);
    }

    private calculateWinner(squares:Array<number>): {winner: number, winningSquares: [number, number, number]} | null {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] !== null && squares[a] === squares[b] && squares[a] === squares[c]) {
                return {winner: squares[a], winningSquares: [a, b, c]};
            }
        }
        return null;
    }

    private navigateHistory(history:BoardState): void {
        if (history.history.length === 0) {
            history.history.push({...DEFAULT_STATE});
        }
        this.setState(history);
    }

    private resetGame() {
        this.setDefaultState();
    }

    public render() {
        const history: Array<JSX.Element> = this.state.history.map((h, i) =>
            <li key={i}><button onClick={(e) => this.navigateHistory(h)}>Turn {i + 1}</button></li>
        );
        history.pop(); // Don't want to go back to the current state
        return (
            <div>
                <StyledStatus>
                    {this.state.gameOver ? (
                        <p>Game over. <button onClick={(e) => this.resetGame()}>Play Again</button></p>
                    ) : (
                        <p>Next Player: {(this.state.turn === Marks.X) ? 'X' : 'O'}</p>
                    )}
                </StyledStatus>
                <StyledBoardRow>
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </StyledBoardRow>
                <StyledBoardRow>
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </StyledBoardRow>
                <StyledBoardRow>
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </StyledBoardRow>
                {this.state.history.length > 0 &&
                    <ol>
                        {history}
                    </ol>
                }
            </div>            
        );
    }
}

export default Board;