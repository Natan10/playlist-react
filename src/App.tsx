import React,{useState} from 'react';
import Player from "./components/player";
import out from "../assets/out.mp3";
import baco from "../assets/baco.mp3";
import daft from "../assets/daft.mp3";
import artic from "../assets/artic.mp3";
import "./style.scss";

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
  }
]

type Props = {
  soundName: string
  sound: string
}

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

  console.log('sound',sound)

  return(
    <div className="main">
      <h1>Playlist</h1>
      <div className="playlist">
        {/* list sounds */}
        <ul>
          {sounds.map((soundItem,index) => {
            return <li
                      key={index} 
                      onClick={e => handleSound(e,index)}
                    >
                      {soundItem.soundName}
                    </li>
          })}
        </ul>
        
        {/* player */}
        <Player 
          song={sound?.sound} 
          skip={skipMusic} 
          back={backMusic}
          disabled={sound ? false : true}
        />
      </div>
    </div>
  )
}