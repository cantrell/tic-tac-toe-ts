import React from 'react';
import Marks from './Marks';
import styled from 'styled-components';

interface SquareProps {
    value: number;
    winningSquare: boolean;
    onClick():void;
}

interface StyledSquareProps {
    background: string;
}

const StyledSquare = styled.button<StyledSquareProps>`
    background: ${props => props.background};
    border: 1px solid #999;
    float: left;
    font-size: 24px;
    font-weight: bold;
    line-height: 34px;
    height: 34px;
    margin-right: -1px;
    margin-top: -1px;
    padding: 0;
    text-align: center;
    width: 34px;
`;

class Square extends React.Component<SquareProps, StyledSquareProps> {
    public render() {
        const symbol = (this.props.value !== null) ? ((this.props.value === Marks.X) ? '❌' : '⭕') : '';
        const bgColor = (this.props.winningSquare) ? 'purple' : 'white';
        return (
            <StyledSquare background={bgColor} onClick={this.props.onClick}>{symbol}</StyledSquare>
        );
    }
}

export default Square;