
import React, { useRef, useLayoutEffect, useMemo, Suspense } from 'react'
import { Canvas as THREECanvas, useFrame } from '@react-three/fiber'

import { useStore } from '../BasicElements/Store';
import { OrthoCamera } from '../BasicElements/Camera';
import { Chart } from '../BasicElements/VizComponents';

function Canvas() {
  const mainCamera = useRef();

  const setProgressVal = useStore((state) => state.setProgressVal);
  
  const scrollLength = 5000;

  useLayoutEffect(() => {
    document.getElementById("dummy").style.height = scrollLength + "px";
  }, []);

  return (
    <div id={"scroller"} onScroll={() => setProgressVal(100 * document.getElementById("scroller").scrollTop / scrollLength)}>
      <div id={"canvas"}>
        <THREECanvas>
          <OrthoCamera ref={mainCamera} />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Chart />
        </THREECanvas>
      </div>
      <div id={"dummy"}> . </div>
    </div>
  );
}

export default Canvas;