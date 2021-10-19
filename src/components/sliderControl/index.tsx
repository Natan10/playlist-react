import React from 'react';
import styled from 'styled-components';


const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`

const SliderTotalTime = styled.span`
 color: white;
 font-weight: bold;
`

const SliderCurrentTime = styled.span`
  color: white;
  font-weight: bold;
`

const Slider = styled.input `
  margin: 0 10px;
  appearance: none;
  width: 100%;
  height: 5px;
  background:rgba(255, 140, 0,0.9);
  border-radius: 5px;
  background-image: linear-gradient(90deg, rgba(255,69,80,1) 70%, rgba(255,140,0,1) 100%);
  background-size: 100%;
  background-repeat: no-repeat;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%; 
    background: #04AA6D;
    cursor: pointer;
    position: relative;
    z-index: 10;
  }

  &::-moz-range-thumb {
    height: 15px;
    width: 15px;
    border-radius: 50%;
    border: transparent;
    background-color: #04AA6D;
    cursor: pointer;
    position: relative;
    z-index: 3;
    box-sizing: border-box;
  }
  /* progress bar - firefox */
  &::-moz-range-progress {
    background-color: blue;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    height: 11px;
  }
`

type Props = {
  totalTime: string
  currentTime: string
  value: number | string
  onChangeRange: (e: any) => any
  maxValue: () => number
  inputRef: React.MutableRefObject<any>
}

const SliderControl = ({totalTime,currentTime,value,inputRef,maxValue,onChangeRange}:Props) => {
  return (
    <SliderWrapper>
      <SliderCurrentTime>
        {currentTime}
      </SliderCurrentTime>
      <Slider 
        type="range" 
        min="0" 
        ref={inputRef}
        max={maxValue()} 
        value={value}
        onChange={onChangeRange}
      />
      <SliderTotalTime>
        {totalTime}
      </SliderTotalTime>
    </SliderWrapper>
  )
}

export default SliderControl