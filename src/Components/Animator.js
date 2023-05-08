import * as THREE from 'three'
import React, { useRef, useLayoutEffect, useMemo } from 'react'

import { Slider } from '@mui/material';
// import { styled } from '@mui/material/styles';

import { useStore } from '../BasicElements/Store';

function Animator() {
  const progressVal = useStore((state) => state.progressVal);
  const setProgressVal = useStore((state) => state.setProgressVal);

  return (
    <div>
      <div>
        {Number.parseFloat(progressVal).toFixed(2)}
      </div>
      <Slider 
        id={"progressSlider"}
        min={0} max={100} step={0.1} value={progressVal} 
        onChange={(e, val) => setProgressVal(val)} 
        aria-label="Default" valueLabelDisplay="auto" />
    </div>
  );
}

export default Animator;