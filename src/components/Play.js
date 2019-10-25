import React from "react";
import {StyledPlay} from './styles/StyledPlay'
export default function Play(props) {
  const { handleClick } = props;

  return (
    <button className="player__button" onClick={() => handleClick()}>
    <StyledPlay>Play</StyledPlay>
    </button>
  );
}
