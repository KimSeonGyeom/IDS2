import * as THREE from 'three'
import React, { useRef, useLayoutEffect, useMemo } from 'react'
import { shallow } from 'zustand/shallow'

import { Slider } from '@mui/material';
// import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

import { useCanvasStore, useClipStore } from '../BasicElements/Store';

function Animator() {
  const progressVal = useCanvasStore((state) => state.progressVal);
  const setProgressVal = useCanvasStore((state) => state.setProgressVal);

  const [animation, cam, getAnimation] = useClipStore((state) => [state.animation, state.cam, state.getAnimation], shallow);

  return (
    <div>
      <div>
        {Number.parseFloat(progressVal).toFixed(2)}
      </div><br/>
      <Button 
        size="small" variant="contained" 
        onClick={() => {
          getAnimation();
          console.log(animation, cam)
        }}
      >
        Add
      </Button><br/><br/>
      <Slider 
        id={"progressSlider"}
        min={0} max={100} step={0.1} value={progressVal} 
        onChange={(e, val) => setProgressVal(val)} 
        aria-label="Default" valueLabelDisplay="auto" />
    </div>
  );
}

export default Animator;