import React, {useState} from 'react';
import Stage from './Stage';
import StartButton from './StartButton';
import Display from './Display';
import {StyledTetris, StyledTetrisWrapper} from './styles/StyledTetris';
import { createStage, checkCollision} from './gameHelpers';
//Custom hooks
import {usePlayer} from '../hooks/usePlayer';
import {useStage} from '../hooks/useStage';
import {useInterval} from '../hooks/useInterval';
import {useGameStatus} from '../hooks/useGameStatus';
import Name from './Name';
const Tetris = () => {
    const [dropTime, setDropTime] = useState(null)
    const [gameOver, setGameOver] = useState(null);

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
    
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
        rowsCleared
        );


    console.log('re-render');

    const movePlayer = dir => { //left or right moves
        if (!checkCollision(player, stage, {x:dir, y:0})) {
            updatePlayerPos({x: dir, y:0});
        }
    }

    const startGame = () => {
        //reset
        setStage(createStage());
        setDropTime(1000);
        resetPlayer();
        setGameOver(false);
        setScore(0);
        setRows(0);
        setLevel(0);
    }

    const drop = () => {
        //Increase level when player clears 10 rows
        if (rows > (level + 1) * 10) {
            setLevel(prev => prev + 1);
            //also increase speed
            setDropTime( 1000 / (level + 1) + 200);
        }

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

    const keyUp = ({keyCode}) => {
        if (!gameOver) {
            if (keyCode === 40 || keyCode === 83) {
                console.log("interval on");
                setDropTime(1000/ (level + 1) + 200);
            }
        }
    }

    const dropPlayer = () => {
        console.log("interval off");
        setDropTime(null); //dont want autodrop when player moving tetromino down
        drop();
    }

    const move = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 37 || keyCode === 65) {
                movePlayer(-1);
            } 
            else if (keyCode === 39 || keyCode === 68) {
                movePlayer(1);
            }
            else if (keyCode === 40 || keyCode === 83) {
                dropPlayer();
            } 
            else if (keyCode === 38 || keyCode === 87) {
                playerRotate(stage, 1);
            }
        }
    }

    useInterval(() => {
        drop();
    }, dropTime)
 
    return (
        <StyledTetrisWrapper 
            role="button" 
            tabIndex="0" 
            onKeyDown={e => move(e)} 
            onKeyUp={keyUp}>
        <StyledTetris>
        <aside>
            {gameOver ? (
                <Display gameOver={gameOver} text="Game Over" />
            ): (
            <div>
            <Display text={`Score: ${score}`}></Display>
            <Display text={`Rows: ${rows}`}></Display>
            <Display text={`Level: ${level}`}></Display>
            </div>
            )}
            <StartButton callback={startGame} />
        </aside>
        <Stage stage={stage}/>
        <Name></Name>
        </StyledTetris>
        </StyledTetrisWrapper>
        
    )
};

export default Tetris;