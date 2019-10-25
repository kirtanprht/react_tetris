import React from "react";
import { StyledPause } from "./styles/StyledPause";

export default function Play(props) {
  const { handleClick } = props;
  
  return (
    <button className="player__button" onClick={() => handleClick()}>
    <StyledPause>Pause Audio</StyledPause>
    </button>
  );
}
