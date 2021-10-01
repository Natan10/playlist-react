import React from 'react';
import {
  BsPlayFill,
  BsFillPauseFill,
  BsFillSkipBackwardFill,
  BsFillSkipForwardFill,
  BsFillSkipStartFill,
  BsFillSkipEndFill
} from "react-icons/bs";
import "./styles.scss"

type Props = {
  skip: () => void
  back: () => void
  isPlaying: () => void
  backward: () => void
  forward: () => void
  isPlay: boolean
}

const Controls: React.FC<Props> = ({isPlay,skip,back,isPlaying,backward,forward,}:Props) => {
  return(
    <div className="controls">
      <button className="skipEnd" onClick={()=>back()}>
      <BsFillSkipStartFill size={24}/>
      </button>
      <button className="backward" onClick={backward}>
        <BsFillSkipBackwardFill size={24}/>
      </button>
      <button className="play" onClick={isPlaying}>
        {isPlay ? <BsFillPauseFill size={24}/> : <BsPlayFill size={24}/> }
      </button>
      <button className="forward" onClick={forward}>
        <BsFillSkipForwardFill size={24}/>
      </button>
      <button className="skipStart" onClick={()=>skip()}>
        <BsFillSkipEndFill size={24}/>
      </button>
    </div>
  )
}

export default Controls;