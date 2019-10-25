import React from "react";

import Song from "./Song";
import Play from "./Play";
import Pause from "./Pause";
import Bar from "./Bar";

import useAudioPlayer from '../hooks/useAudioPlayer';

function Audio() {
  const { curTime, duration, playing, setPlaying, setClickedTime } = useAudioPlayer();

  return (
    <div className="player">
      <audio id="audio">
        <source src="./song.mp3" />
        Your browser does not support the <code>audio</code> element.
      </audio>
      <Song songName="" songArtist="" />
      <div className="controls">
        {playing ? 
          <Pause handleClick={() => setPlaying(false)} /> :
          <Play handleClick={() => setPlaying(true)} />
        }
        <Bar curTime={curTime} duration={duration} onTimeUpdate={(time) => setClickedTime(time)}/>
      </div>
    </div>
  );
}

export default Audio;
