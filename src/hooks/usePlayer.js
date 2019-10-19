import { useState, useCallback } from 'react';
import { STAGE_WIDTH, checkCollision } from '../components/gameHelpers'

import { TETROMINOS, randomTetromino } from '../components/tetronimos';
import { clone } from '@babel/types';

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos: {x:0, y:0 },
        // tetromino: randomTetromino().shape,
        tetromino: TETROMINOS[0].shape,
        collided: false,
    })
    // equal to same as below
    // const playerState = useState();
    // const player = playerState[0];
    // const setPlayer = playerState[1]

    const rotate = (matrix, dir) => {
        //make rows to be columns (transpose)
        const rotatedTetro = matrix.map((_, index) => matrix.map(col => col[index]))

        //reverse each row to get a rotated matrix/tetromino
        if (dir > 0) return rotatedTetro.map(row => row.reverse());
        return rotatedTetro.reverse();
    }

    const playerRotate = (stage, dir) => {
        //create a deep copy, do not want to modify state
        const clonedPlayer = JSON.parse(JSON.stringify(player));
        
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);
        
        const pos = clonedPlayer.pos.x;
        let offset = 1;

        //dont want to collide when rotating
        while(checkCollision(clonedPlayer, stage, {x:0, y:0})) {
            clonedPlayer.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > clonedPlayer.tetromino[0].length) {
                rotate(clonedPlayer.tetromino, -dir);
                clonedPlayer.pos.x = pos;
                return;
            }
        }
        setPlayer(clonedPlayer);
    }

    const updatePlayerPos = ({x, y, collided}) => {
        setPlayer(prev => ({
            ...prev,
            pos: {x:(prev.pos.x += x), y: (prev.pos.y +=y)},
            collided,
        }))
    }


    const resetPlayer = useCallback(() => {
        setPlayer({
            pos: {x:STAGE_WIDTH / 2 - 2, y: 0},
            tetromino: randomTetromino().shape,
            collided: false,
        })
    }, [])
    return [player, updatePlayerPos, resetPlayer, playerRotate];
}