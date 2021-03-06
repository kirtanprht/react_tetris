import React from 'react';
import { StyledCell } from './styles/StyledCell';
import { TETROMINOS } from './tetronimos';
const Cell = ({ type }) => (
    <StyledCell type={type} color={TETROMINOS[type].color}></StyledCell>
)

export default React.memo(Cell); //memo -> only rerenders when cells are changing!