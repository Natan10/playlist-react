import React,{useState,useRef,useEffect,useCallback} from "react";
import styled,{css} from "styled-components";
import {Controls,SliderControl} from "..";

interface PlayerProps{
  disabled: boolean
}

type Props = {
  disabled: boolean
  sound: string 
  skip: () => void
  back: () => void
}

const PlayerWrapper = styled.div<PlayerProps>`
  background-color: #000011;
  width: 100%;
  max-width: 330px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;

  ${({disabled}) => disabled && css`
    pointer-events: none;
    opacity: 0.5;
  `}
`

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

  const backward = () => {
   if(audioRef.current.currentTime > 0) {
      audioRef.current.currentTime -= 30
    }
  }

  const forward = () =>{
    if(audioRef.current.currentTime < audioRef.current.duration) {
      setValue(audioRef.current.currentTime += 30)
    }
  }

  const isPlaying = () => {
    const aux = !isPlay;
    if(aux){
      audioRef.current.play()
    }else{
      audioRef.current.pause()
    }
    setIsPlay(old => !old)
  }

  const onChangeRange = (e) =>{
    const valueTime = Math.floor(e.target.value)
    audioRef.current.currentTime = valueTime
    inputRef.current.value = valueTime
    setValue(valueTime)
  }

  const handleBar = (value) => {
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
    <PlayerWrapper disabled={disabled}>  
      {/* slide control */}
      <SliderControl 
        inputRef={inputRef} 
        totalTime={totalTime} 
        currentTime={currentTime}
        maxValue={maxValue}
        onChangeRange={(e) => onChangeRange(e)}
        value={value}
      />
      <audio 
        ref={audioRef} 
        src={sound}
        preload="metadata"
        onEnded={skip}
        onCanPlay={handleTimeSound}
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
    </PlayerWrapper>
  )
}

export default Player;