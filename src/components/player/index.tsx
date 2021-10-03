import React,{useState,useRef,useEffect,useCallback} from "react";
import Controls from "../controls";
import "./style.scss";

type Props = {
  disabled: boolean
  sound: string 
  skip: () => void
  back: () => void
}

const Player:React.FC<Props> = ({disabled,sound,skip,back}: Props) => {
  const inputRef = useRef(null)
  const audioRef = useRef(null)
  const [isPlay,setIsPlay] = useState(false);
  const [totalTime,setTotalTime] = useState('');
  const [currentTime,setCurrentTime] = useState('');
  const [value,setValue] = useState(0);
  
  useEffect(()=>{
    handleBar(value)
  },[value])
  
  useEffect(()=>{
    setIsPlay(false)
    setValue(0)
  },[sound])

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

  const maxValue = useCallback(() =>{
    return Math.floor(audioRef?.current?.duration) || 10
  },[])
  
  const handleTimeSound = useCallback(()=>{
    const time = audioRef?.current?.duration
    const min = Math.floor(time/60);
    const sec = Math.floor(time - min *60);

    if(isNaN(min)){
      setTotalTime('')
    }
    setTotalTime(`${String(min).padStart(2,'0')}:${sec}`)
    setCurrentTime('00:00')
  },[sound])

  const currentTimeUpdate = (value) => {
    const min = Math.floor(value/60);
    const sec = Math.floor(value - min *60);

    if(isNaN(min)){
      setCurrentTime('')
    }
    setCurrentTime(`${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`)
  }

  const handleTimeUpdate = useCallback((e) =>{
    const currentTime = e.currentTarget.currentTime
    setValue(currentTime)
    currentTimeUpdate(currentTime)
  },[sound])

  return(
    <div className={`audio-play ${disabled ? 'disabled':''}`}>
      <div className="slider-controls">
        <span className="currentTime">
          {currentTime}
        </span>
        <input 
          className="slider"
          ref={inputRef} 
          type="range" 
          min="0" 
          max={maxValue()} 
          value={value}
          onChange={onChangeRange}   
        />
        <span className="totalTime">
          {totalTime}
        </span>
      </div>
      <audio 
        ref={audioRef} 
        src={sound}
        preload="metadata"
        onEnded={skip}
        onCanPlay={handleTimeSound}
        // onTimeUpdate={(e) => setValue(e.currentTarget.currentTime)}
        onTimeUpdate={handleTimeUpdate}
      />

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