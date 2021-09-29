import React,{useState} from "react";
import {BsPlayFill,BsFillPauseFill,BsFillSkipBackwardFill,BsFillSkipForwardFill} from "react-icons/bs";
import sound from "../assets/baco.mp3";
import "./style.scss";

export default function App(){
  const [isPlay,setIsPlay] = useState(false);
  const [audio] = useState(new Audio(sound));
 
  
  // function time(){
  //   console.log("buffer",audio.buffered)
  //   console.log("duration",audio.duration)
  //   console.log("played",audio.played)
  //   console.log("readyState",audio.readyState)
  //   console.log("src",audio.currentSrc)
  //   console.log("content",audio.seeking)
  //   console.log("volume",audio.volume)
  //   console.log("currentTime",audio.currentTime)
  // }

  function backward(){
   if(audio.currentTime > 0) {
      audio.currentTime -= 30
    }
  }

  function forward(){
    if(audio.currentTime < audio.duration) {
      audio.currentTime += 30
    }
  }

  function isPlaying(){
    const aux = !isPlay;
    setIsPlay(old => !old)
    if(aux){
      audio.play()
    }else{
      audio.pause()
    }
  }


  return(
    <div className="main">
      <h1>Testando Web Audio API</h1>
      <div className="audio-play">
        <div className="controls">
          <button className="backward" onClick={backward}>
            <BsFillSkipBackwardFill size={24}/>
          </button>
          <button className="play" onClick={isPlaying}>
            {isPlay ? <BsFillPauseFill size={24}/> : <BsPlayFill size={24}/> }
          </button>
          <button className="forward" onClick={forward}>
            <BsFillSkipForwardFill size={24}/>
          </button>
        </div>
      </div>

    </div>
  )
}