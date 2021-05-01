import React from 'react';
import Marks from './Marks';

/*
 * Example of a function component. (See Square2 for the class version.)
*/

interface SquareProps {
    value: number;
    winningSquare: boolean;
    onClick():void;
}

function Square(props:SquareProps) {
    const symbol = (props.value !== null) ? (props.value === Marks.X) ? '❌' : '⭕' : '';
    let classList = 'square';
    if (props.winningSquare) {
        classList += ' winning-square';
    }
    return (
        <button className={classList} onClick={props.onClick}>{symbol}</button>
    );
}

export default Square;