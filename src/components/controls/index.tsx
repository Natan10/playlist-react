import React from 'react';
import styled from "styled-components";
import {
  BsPlayFill,
  BsFillPauseFill,
  BsFillSkipBackwardFill,
  BsFillSkipForwardFill,
  BsFillSkipStartFill,
  BsFillSkipEndFill
} from "react-icons/bs";

const PlayerControl = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Button = styled.button`
  cursor: pointer;
  background: none;
  border: none;

  svg{
    fill: white;
  }
`;

const BtnControl = styled(Button)` 
  &:hover{
    transform: scale(1.05,1.05);
  }

  &.play{
    padding: 16px;
    border: 1px solid white;
    border-radius: 50%;
    outline: none;
    background: transparent;
    transition: background-color 0.4s;

    &:hover{
      background-color: rgba(255,255,255,0.1);
      transform: scale(1.05,1.05);
    }
  }

  @media(max-width: 450px){
   &.play{
    padding: 12px;
  }}
`


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
    <PlayerControl>
      <BtnControl className="skipEnd" onClick={()=>back()}>
      <BsFillSkipStartFill size={24}/>
      </BtnControl>
      <BtnControl className="backward" onClick={backward}>
        <BsFillSkipBackwardFill size={24}/>
      </BtnControl>
      <BtnControl className="play" onClick={isPlaying}>
        {isPlay ? <BsFillPauseFill size={24}/> : <BsPlayFill size={24}/> }
      </BtnControl>
      <BtnControl className="forward" onClick={forward}>
        <BsFillSkipForwardFill size={24}/>
      </BtnControl>
      <BtnControl className="skipStart" onClick={()=>skip()}>
        <BsFillSkipEndFill size={24}/>
      </BtnControl>
    </PlayerControl>
  )
}

export default Controls;