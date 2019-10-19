import React from 'react';
import Stage from './Stage';
import Cell from './Cell';
import StartButton from './StartButton';
import Display from './Display';

const Tetris = () => (
    <div>
    return (
        <Stage />
        <aside>
            <div>
            <Display text="score"></Display>
            <Display text="rows"></Display>
            <Display text="levels"></Display>
            </div>
            <StartButton />
        </aside>
    )
    </div>
)

export default Tetris;