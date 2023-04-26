import * as THREE from 'three'
import React, { useRef, useState, useEffect, useCallback, useLayoutEffect, useMemo, Suspense } from 'react'

import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useStore } from '../BasicElements/Store';

function Animator() {
  const scale = useStore((state) => state.scale);
  const setScale = useStore((state) => state.setScale);

  const camPos = useStore((state) => state.camPos);
  const setCamPos = useStore((state) => state.setCamPos);

  const camZoom = useStore((state) => state.camZoom);
  const setCamZoom = useStore((state) => state.setCamZoom);

  return (
    <div>
      <TextField id="outlined-basic" label="Scale" variant="outlined" size="small" value={scale}
        onChange={(e) => {
          setScale(e.target.value);
        }}/>
      <TextField id="outlined-basic" label="camX" variant="outlined" size="small" value={camPos[0]}
        onChange={(e) => {
          setCamPos([e.target.value, camPos[1], camPos[2]]);
        }}/>
      <TextField id="outlined-basic" label="camY" variant="outlined" size="small" value={camPos[1]}
        onChange={(e) => {
          setCamPos([camPos[0], e.target.value, camPos[2]]);
        }}/>
      <TextField id="outlined-basic" label="camZ" variant="outlined" size="small" value={camPos[2]}
        onChange={(e) => {
          setCamPos([camPos[0], camPos[1], e.target.value]);
        }}/>
      <TextField id="outlined-basic" label="camZoom" variant="outlined" size="small" value={camZoom}
        onChange={(e) => {
          setCamZoom(e.target.value);
        }}/>
    </div>
  );
}

export default Animator;