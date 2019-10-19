import { useState, useEffect } from 'react';
import { createStage } from '../components/gameHelpers';

export const useStage = (player, resetPlayer) => {
    const [stage, setStage] = useState(createStage());
    const [rowsCleared, setRowsCleared] = useState(0);

    useEffect(() => {
        setRowsCleared(0);

        const sweepRows = newStage => //implicit return so curly braces not needed
            newStage.reduce((ack, row) => {
                if (row.findIndex(cell => cell[0] === 0) === -1) { //if contains 0 we havent filled up the row
                    setRowsCleared(prev => prev +1);
                    // ack.unshift adds new empty row to top of stage because we are removing the "cleared" rows
                    ack.unshift(new Array(newStage[0].length).fill([0, 'clear']));
                    return ack;
                } //if dont have full row just return
                ack.push(row);
                return ack;
            }, [])

        const updateStage = prevStage => {
            const newStage = prevStage.map(row =>
                row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)), //grabbing gameHelpers.js line 8 value here
                );

                // then draw the tetromino
                player.tetromino.forEach((row, y) => {
                    row.forEach((value, x) => {
                        if (value !== 0) {
                            newStage[y+player.pos.y][x + player.pos.x] = [
                                value,
                                `${player.collided ? 'merged' : 'clear'}`,
                            ];
                        }
                    });
        });
        //check if collided
        if (player.collided) {
            resetPlayer();
            return sweepRows(newStage);
        }

        return newStage;
    };


        setStage(prev => updateStage(prev));
    }, [player, resetPlayer])

    return [stage, setStage, rowsCleared];
}