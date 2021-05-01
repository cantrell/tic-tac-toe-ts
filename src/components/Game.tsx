import React from 'react';
import Board from './Board';
import Marks from './Marks';
import styled from 'styled-components';

interface GameProps {
}

interface GameState {
    xWins: number;
    oWins: number;
}

const StyledScore = styled.div`
    display: table;
`;

const StyledRow = styled.div`
    display: table-row;
`;

const StyledCell = styled.div`
    display: table-cell;
    padding: 4px;
    text-align: right;
`;

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
                <StyledScore>
                    <StyledRow>
                        <StyledCell>X wins:</StyledCell><StyledCell>{this.state.xWins}</StyledCell>
                    </StyledRow>
                    <StyledRow>
                        <StyledCell>O wins:</StyledCell><StyledCell>{this.state.oWins}</StyledCell>
                    </StyledRow>
                </StyledScore>
                <div>
                    <Board onWinner={this.handleWinner}/>
                </div>
            </div>
        );
    }
}

export default Game;