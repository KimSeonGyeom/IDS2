
import React, { useRef, useLayoutEffect, useMemo, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import { shallow } from 'zustand/shallow'

import { OrthoCamera } from '../BasicElements/Camera';
import { Heatmap } from '../BasicElements/VizComponents';
import { useClipStore } from '../BasicElements/Store';

function THREECanvas({ scroll, ...props}) {
  const mainCamera = useRef();

  const [animation] = useClipStore((state) => [state.animation], shallow);

  useFrame(() => {
    console.log(scroll.current);
    // console.log(mainCamera.current.position);
    mainCamera.current.position.setX(animation[Math.floor(scroll.current)].camX);
    mainCamera.current.position.setY(animation[Math.floor(scroll.current)].camY);
    mainCamera.current.position.setZ(animation[Math.floor(scroll.current)].camZ);
    mainCamera.current.zoom = animation[Math.floor(scroll.current)].camZoom;
    mainCamera.current.updateProjectionMatrix();
    // console.log(gl.info.render)
  });


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