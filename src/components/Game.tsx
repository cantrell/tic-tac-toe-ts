import React from 'react';
import Board from './Board';
import Marks from './Marks';

interface GameProps {

}

interface GameState {
    xWins: number;
    oWins: number;
}

class Game extends React.Component<GameProps, GameState> {

    public constructor(props: GameProps) {
        super(props);
        this.state = {
            xWins: 0,
            oWins: 0
        }
        this.handleWinner = this.handleWinner.bind(this);
    }

    private handleWinner(winner: number): void {
        this.setState({
            xWins: (winner === Marks.X) ? this.state.xWins + 1 : this.state.xWins,
            oWins: (winner === Marks.O) ? this.state.oWins + 1 : this.state.oWins
        });
    }

    public render() {
        return (
            <div>
                <div className="game">
                    <div className="game-board">
                        <Board onWinner={this.handleWinner}/>
                    </div>
                    <div className="game-info">
                        <div>
                            <div>X wins: {this.state.xWins}</div>
                            <div>O wins: {this.state.oWins}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;