import React,{useState,useRef,useEffect} from "react";
import {BsPlayFill,BsFillPauseFill,BsFillSkipBackwardFill,BsFillSkipForwardFill} from "react-icons/bs";
import sound from "../assets/baco.mp3";
import "./style.scss";

export default function App(){
  const inputRef = useRef(null)
  const audioRef = useRef(null)
  const [isPlay,setIsPlay] = useState(false);
  const [value,setValue] = useState(0);
 
  useEffect(()=>{
    handleBar(value)
  },[value])

  function backward(){
   if(audioRef.current.currentTime > 0) {
      audioRef.current.currentTime -= 30
    }
  }

  function forward(){
    if(audioRef.current.currentTime < audioRef.current.duration) {
      setValue(audioRef.current.currentTime += 30)
    }
  }

  function isPlaying(){
    const aux = !isPlay;
    setIsPlay(old => !old)
    if(aux){
      audioRef.current.play()
    }else{
      audioRef.current.pause()
    }
  }

  function onChangeRange(e){
    const valueTime = Math.floor(e.target.value)
    audioRef.current.currentTime = valueTime
    inputRef.current.value = valueTime
    setValue(valueTime)
  }

  function handleBar(value){
    const min = inputRef.current.min
    const max = inputRef.current.max
    inputRef.current.style.backgroundSize = (value - min) * 100 / (max - min) + '% 100%'
  }

  function maxValue(){
    return Math.floor(audioRef?.current?.duration) || 10
  }

  return(
    <div className="main">
      <h1>Testando Web Audio API</h1>
      <div className="audio-play">
        <input 
          className="slider"
          ref={inputRef} 
          type="range" 
          min="0" 
          max={maxValue()} 
          value={value}
          onChange={onChangeRange}   
        />
        <audio 
          ref={audioRef} 
          src={sound}
          onTimeUpdate={(e) => setValue(e.currentTarget.currentTime)}/>
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