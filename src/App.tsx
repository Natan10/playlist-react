import React,{useState} from 'react';
import styled from "styled-components"
import {Player} from "./components";
import out from "../assets/out.mp3";
import baco from "../assets/baco.mp3";
import daft from "../assets/daft.mp3";
import artic from "../assets/artic.mp3";
import clorine from "../assets/clorine.mp3";

const mockSounds = [
  {
    "soundName": "Baco Exu",
    "sound": baco
  },
  {
    "soundName": "Stressed Out - Twenty One Pilots",
    "sound": out
  },
  {
    "soundName": "Artic monkeys",
    "sound": artic
  },
  {
    "soundName": "Daft Punk",
    "sound": daft
  },
  {
    "soundName": "Clorine",
    "sound": clorine
  }
]

type Props = {
  soundName: string
  sound: string
}

const MainWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #000011;
  padding: 40px;

  h1{
    color: white;
    margin-bottom: 10px;
    text-align: center;
  }
`

const PlaylistWrapper = styled.div` 
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 2px solid rgba(255,255,255,0.8);
  border-radius: 10px;
  padding: 40px;
  max-width: 600px;
  width: 100%;
  height: 600px;
  position: relative;

  .title{
    position: absolute;
    top: -24px;
    left: 24px;
    background: #010311;
    padding: 0 14px;
  }

  @media(max-width: 450px){
    .title{
      font-size: 24px;
      top: -17px;
      left: 24px;
    }
  }
`

const PlaylistSongs = styled.ul`
  width: 100%;
  height: 100%;
  padding: 0;
  margin-bottom: 24px;   
  list-style-type: none;
  color: white;
  text-align: center;
  font-size: 24px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
  li{
    cursor: pointer;
    margin: 10px 0px;
    font-size: 24px;
    border-radius: 2px;

    &.active {
      background-color: #04AA6D;
    }

    &:hover{
      background-color: rgba(255,255,255,0.4);
      transition: background-color 0.8s;
    }
  }
  @media(max-width: 450px){
    li {
      font-size: 20px;
    }    
  }
`



export default function App(){
  const [sounds] = useState<Props[]>(mockSounds);
  const [sound,setSound] = useState<Props>(null as Props);
  const [li,setLi] = useState(0);
  
  const handleSound = (event,index) => {
    const choice = sounds.find(soundItem => soundItem.soundName === event.target.textContent);
    setSound(choice)
    handleListItem(index)
  }

  const handleListItem = (index) => {
    const elements = document.getElementsByTagName('li')
    if(li !== index){
      elements[index].classList.add('active')
      elements[li].classList.remove('active')
    }else{
      elements[index].classList.add('active')
    }
    setLi(index)
  }
  
  const findIndexSound = (sound:Props) => {
    return sounds.findIndex(i => i.soundName === sound.soundName);
  }

  const skipMusic = () =>{
    const index = findIndexSound(sound)
    if(index === (sounds.length - 1)){
      setSound(sounds[0])
      handleListItem(0)
    }else{
      setSound(sounds[index + 1])
      handleListItem(index + 1)
    }
  }

  const backMusic = () => {
    const index = findIndexSound(sound)
    if(index === 0){
      setSound(sounds[sounds.length - 1])
      handleListItem(sounds.length - 1)
    }else{
      setSound(sounds[index - 1])
      handleListItem(index - 1)
    }
  }


  return(
    <MainWrapper>
      <PlaylistWrapper>
        <h1 className="title">Playlist</h1>

        {/* list songs */}
        <PlaylistSongs>
          {sounds.map((soundItem,index) => {
            return <li
                      key={index} 
                      onClick={e => handleSound(e,index)}
                    >
                      {soundItem.soundName}
                    </li>
          })}
        </PlaylistSongs>

        {/* player */}
        <Player 
          sound={sound?.sound} 
          skip={skipMusic} 
          back={backMusic}
          disabled={sound ? false : true}
        />
      </PlaylistWrapper>
    </MainWrapper>
  )
}