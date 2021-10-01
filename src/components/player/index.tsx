import React,{useState,useRef,useEffect} from "react";
import Controls from "../controls";
import "./style.scss";

type Props = {
  disabled: boolean
  song: string 
  skip: () => void
  back: () => void
}

const Player:React.FC<Props> = ({disabled,song,skip,back}: Props) => {
  const inputRef = useRef(null)
  const audioRef = useRef(null)
  const [isPlay,setIsPlay] = useState(false);
  const [value,setValue] = useState(0);
  
  
  useEffect(()=>{
    handleBar(value)
  },[value])
  
  useEffect(()=>{
    setIsPlay(false)
    setValue(0)
  },[song])

  
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
    if(aux){
      audioRef.current.play()
    }else{
      audioRef.current.pause()
    }
    setIsPlay(old => !old)
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
    <div className={`audio-play ${disabled ? 'disabled':''}`}>
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
        src={song}
        preload="metadata"
        onEnded={()=> skip()}
        onTimeUpdate={(e) => setValue(e.currentTarget.currentTime)}/>

      {/* controls */}
      <Controls
       back={back}
       backward={backward}
       forward={forward}
       skip={skip}
       isPlay={isPlay}
       isPlaying={isPlaying}
      />
    </div>
  )
}

export default Player;