
import React, { useRef, useLayoutEffect, useMemo, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'

import { OrthoCamera } from '../BasicElements/Camera';
import { Heatmap } from '../BasicElements/VizComponents';

function THREECanvas() {
  const mainCamera = useRef();

  return (
    <Canvas>
      <OrthoCamera ref={mainCamera} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Heatmap />
    </Canvas>
  );
}

export default THREECanvas;