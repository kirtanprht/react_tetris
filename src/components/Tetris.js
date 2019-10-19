import React, {useState} from 'react';
import Stage from './Stage';
import Cell from './Cell';
import StartButton from './StartButton';
import Display from './Display';
import {StyledTetris, StyledTetrisWrapper} from './styles/StyledTetris';
import { createStage, checkCollision} from './gameHelpers';
//Custom hooks
import {usePlayer} from '../hooks/usePlayer';
import {useStage} from '../hooks/useStage';


const Tetris = () => {
    const [dropTime, setDropTime] = useState(null)
    const [gameOver, setGameOver] = useState(null);

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage] = useStage(player, resetPlayer);

    console.log('re-render');

    const movePlayer = dir => { //left or right moves
        if (!checkCollision(player, stage, {x:dir, y:0})) {
            updatePlayerPos({x: dir, y:0});
        }
    }

    const startGame = () => {
        //reset
        setStage(createStage());
        resetPlayer();
        setGameOver(false);
    }

    const drop = () => {
        if (!checkCollision(player, stage, {x:0, y:1})) {
            updatePlayerPos({x:0, y:1, collided: false});
        }
        else {
            //Game Over
            if (player.pos.y <1) {
                console.log("GAME OVER");
                setGameOver(true);
                setDropTime(null);
            }
            updatePlayerPos({x:0, y:0, collided: true});
        }
    }

    const dropPlayer = () => {
        drop();
    }

    const move = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 37) {
                movePlayer(-1);
            } 
            else if (keyCode === 39) {
                movePlayer(1);
            }
            else if (keyCode === 40) {
                dropPlayer();
            } 
            else if (keyCode === 38) {
                playerRotate(stage, 1);
            }
        }
    }
 
    return (
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
        <StyledTetris>
        <Stage stage={stage}/>
        <aside>
            {gameOver ? (
                <Display gameOver={gameOver} text="Game Over" />
            ): (
            <div>
            <Display text="score"></Display>
            <Display text="rows"></Display>
            <Display text="levels"></Display>
            </div>
            )}
            <StartButton callback={startGame} />
        </aside>
        </StyledTetris>
        </StyledTetrisWrapper>
        
    )
};

export default Tetris;