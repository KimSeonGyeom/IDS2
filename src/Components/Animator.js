import * as THREE from 'three'
import React, { useRef, useLayoutEffect, useMemo } from 'react'
import { shallow } from 'zustand/shallow'

import { Slider } from '@mui/material';
// import { styled } from '@mui/material/styles';

import { toFixed2, useCanvasStore, useClipStore } from '../BasicElements/Store';
import { scrollLength } from '../BasicElements/Constants';

function Animator() {
  const [ progressVal ] = useCanvasStore((state) => [state.progressVal], shallow);

  return (
    <div>
      <div>
        {
          // Number.parseFloat(target / scrollLength * 100).toFixed(2)
        }
      </div><br/>
      <Slider 
        id={"progressSlider"}
        min={0} max={100} step={0.1} value={toFixed2(100 * progressVal / scrollLength)} 
        onChange={(e, val) => {document.getElementById("scroller").scrollTop = (val * scrollLength / 100);}} 
        aria-label="Default" valueLabelDisplay="auto" />
    </div>
  );
}

export default Animator;