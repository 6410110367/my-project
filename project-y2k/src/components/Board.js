import React, {useState} from 'react'
import Tile from './Tile';
import Cell from './Cell';
import {Board} from "../helper";
import useEvent from '../hooks/useEvent';

const BoardView = () => {
    const [board,setBoard] = useState(new Board());

    const handlerKeyDown = (event) =>{
        if(board.hasWon()){
            return;
        }

        if(event.keyCode >= 37 && event.keyCode <= 40){
            let direction = event.keyCode - 37;
            let boardClone = Object.assign(Object.create(
                Object.getPrototypeOf(board)), 
                board
            );
            let newBoard = boardClone.move(direction)
            setBoard(newBoard);
        }
    };

    const cells = board.cells.map((row, rowIndex) => {
        return (
            <div key={rowIndex}>
                {row.map((col, colIndex) => {
                    return <Cell key={rowIndex * board.size + colIndex} />;
                })}
            </div>
        );
    });

    const tiles = board.tiles
        .filter((tile) => tile.value !== 0)
        .map((tile, index) => {
            return <Tile tile={tile} key={index}/>;
        });

    return (
        <div>
            <div className='board'>
                {cells}
                {tiles}
            </div>
        </div>
    );
};

export default BoardView;
