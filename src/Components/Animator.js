import * as THREE from 'three'
import React, { useRef, useLayoutEffect, useMemo } from 'react'
import { shallow } from 'zustand/shallow'

import { Slider } from '@mui/material';
// import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

import { useClipStore } from '../BasicElements/Store';
import { scrollLength } from '../BasicElements/Constants';

function Animator() {
  const [animation, cam, getAnimation] = useClipStore((state) => [state.animation, state.cam, state.getAnimation], shallow);

  return (
    <div>
      <div>
        {
          // Number.parseFloat(target / scrollLength * 100).toFixed(2)
        }
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
        min={0} max={100} step={0.1} value={0} 
        onChange={(e, val) => {document.getElementById("scroller").scrollTop = (val * scrollLength / 100);}} 
        aria-label="Default" valueLabelDisplay="auto" />
    </div>
  );
}

export default Animator;