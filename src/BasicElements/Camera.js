import * as THREE from 'three'
import React, { useRef, useEffect } from 'react'
import { shallow } from 'zustand/shallow'

import { useUpdate } from 'react-three-fiber'
import { useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, OrthographicCamera } from '@react-three/drei';
import { useCanvasStore, useClipStore, MODE_EDIT_CAMERA, MODE_PLAY_SCROLLY } from './Store';

import { If } from './Constants';

const OrthoCamera = React.forwardRef((props, ref) => {
  const mainCamera = useRef();
  const control = useRef();

  const [animation] = useClipStore((state) => [state.animation], shallow);
  const [mode, progressVal] = useCanvasStore((state) => [state.mode, state.progressVal], shallow);
  const [camX, camY, camZ, lookX, lookY, lookZ, zoom] = useCanvasStore((state) => [state.camX, state.camY, state.camZ, state.lookX, state.lookY, state.lookZ, state.zoom], shallow)
  const [setCamX, setCamY, setCamZ, setLookX, setLookY, setLookZ, setZoom] = useCanvasStore((state) => [
    state.setCamX, state.setCamY, state.setCamZ, state.setLookX, state.setLookY, state.setLookZ, state.setZoom
  ], shallow);

  useEffect(() => {
      mainCamera.current.position.set(
        camX,
        camY,
        camZ,
      );
      mainCamera.current.zoom = zoom;
      mainCamera.current.lookAt(
        lookX, 
        lookY, 
        lookZ
      );
      mainCamera.current.updateProjectionMatrix();
    },
    [camX, camY, camZ, lookX, lookY, lookZ, zoom]
  );

  useEffect(() => {
    if(mode == MODE_PLAY_SCROLLY){
      let animation_camera = animation[progressVal]
      mainCamera.current.position.set(
        animation_camera.camX,
        animation_camera.camY,
        animation_camera.camZ,
      );
      mainCamera.current.zoom = animation_camera.camZoom;
      mainCamera.current.lookAt(0, 0, 0);
      mainCamera.current.updateProjectionMatrix();
      // console.log(gl.info.render)
      setCamX(animation_camera.camX);
      setCamY(animation_camera.camY);
      setCamZ(animation_camera.camZ);
      // lookAt
      setZoom(animation_camera.camZoom);
    }},
    [progressVal]
  );

  return(
    <>
      <OrthographicCamera ref={mainCamera} makeDefault near={0} far={10000} />
      <If if={mode == MODE_EDIT_CAMERA}>
        <OrbitControls
          ref={control}
          onChange={(e) => {
            console.log(e.target);
            setCamX(e.target.object.position.x);
            setCamY(e.target.object.position.y);
            setCamZ(e.target.object.position.z);
            setZoom(e.target.object.zoom);
            setLookX(e.target.target.x)
            setLookY(e.target.target.y)
            setLookZ(e.target.target.z)
          }}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          zoomSpeed={0.25}
          style={{zIndex: 5}} />
      </If>
      {
        
      }
    </>
  );
});

const MiniMap = (props) => {
  // This reference will give us direct access to the mesh
  const miniMapCameraRef = useRef();
  const { gl, size } = useThree();

  const frustumSize = 500;
  const aspect = size.width / size.height;
  const ratio = 1.0;

  const miniMapLocationLeftPixels = 0;
  const miniMapLocationBottomPixels = 0;

  useFrame(({ gl, scene, camera }) => {
    gl.autoClear = true;
    gl.setViewport(0, 0, size.width, size.height);
    gl.setScissor(0, 0, size.width, size.height);
    gl.setScissorTest(true);
    gl.render(scene, camera);
    gl.autoClear = false;
    gl.clearDepth();

    // render minicamera
    gl.setViewport(
      miniMapLocationLeftPixels,
      miniMapLocationBottomPixels,
      size.width * ratio,
      size.height * ratio
    );
    gl.setScissor(
      miniMapLocationLeftPixels,
      miniMapLocationBottomPixels,
      size.width * ratio,
      size.height * ratio
    );
    gl.setScissorTest(true);
    miniMapCameraRef.current.zoom = 6.25;
    miniMapCameraRef.current.position.x = 0;
    miniMapCameraRef.current.position.y = 20000;
    miniMapCameraRef.current.position.z = 1000;
    miniMapCameraRef.current.lookAt(new THREE.Vector3(0, 20000, 1000 - 100));
    miniMapCameraRef.current.aspect = aspect;
    miniMapCameraRef.current.updateMatrixWorld();
    miniMapCameraRef.current.updateProjectionMatrix();
    gl.render(scene, miniMapCameraRef.current);
  }, 1);

  return (
    <>
      <OrthographicCamera
        ref={miniMapCameraRef}
        makeDefault={false}
        position={[0, 0, 0]}
        near={0.1}
        far={1000}
        zoom={5}
      />
    </>
  );
};

export { OrthoCamera, MiniMap }