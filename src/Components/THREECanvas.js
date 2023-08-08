import * as THREE from 'three'
import React, { useRef, useLayoutEffect, useMemo, Suspense } from 'react'

import { OrthoCamera } from '../BasicElements/Camera';
import { Heatmap } from '../BasicElements/VizComponents';

function THREECanvas({ scroll, ...props}) {
  const mainCamera = useRef();

  return (
    <>
      <OrthoCamera ref={mainCamera} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Heatmap />
    </>
  );
}

export default THREECanvas;