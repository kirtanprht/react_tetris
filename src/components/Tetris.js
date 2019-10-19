import React from 'react';
import Stage from './Stage';
import Cell from './Cell';
import StartButton from './StartButton';
import Display from './Display';
import { createStage } from './gameHelpers'
import {StyledTetris, StyledTetrisWrapper} from './styles/StyledTetris';
const Tetris = () => {
    return (
        
            <StyledTetrisWrapper>
            <StyledTetris>
        <Stage stage={createStage()}/>
        <aside>
            <div>
            <Display text="score"></Display>
            <Display text="rows"></Display>
            <Display text="levels"></Display>
            </div>
            <StartButton />
        </aside>
        </StyledTetris>
        </StyledTetrisWrapper>
        
    )
};

export default Tetris;