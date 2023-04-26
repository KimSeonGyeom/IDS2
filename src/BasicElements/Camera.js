import * as THREE from 'three'
import React, { useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, OrthographicCamera } from '@react-three/drei';
import { useStore } from './Store';

const OrthoCamera = React.forwardRef((props, ref) => {
  const mainCamera = useRef();
  const controls = useRef();

  const progressVal = useStore((state) => state.progressVal);
  const camPos = useStore((state) => state.camPos);
  const setCamPos = useStore((state) => state.setCamPos);
  const camZoom = useStore((state) => state.camZoom);
  const setCamZoom = useStore((state) => state.setCamZoom);

  useFrame((state, delta) => {
    // console.log(progressVal);
    // setCamPos([1000 - progressVal * 10, 1000 - progressVal * 1, 1000 - progressVal * 3]);
    // mainCamera.current.position.setX(camPos[0] - progressVal * 10);
    // mainCamera.current.position.setY(camPos[1] - progressVal * 1);
    // mainCamera.current.position.setZ(camPos[2] - progressVal * 3);
    // mainCamera.current.lookAt(camPos[0], camPos[1] - progressVal * 1, camPos[2] - 1);
    // mainCamera.current.lookAt(0, 0, 0);
    // mainCamera.current.updateProjectionMatrix();
    // setCamZoom((10 + progressVal * 1.2)<100? 10 + progressVal * 1.2: 100);
  });

  return(
    <>
      <OrthographicCamera ref={mainCamera} makeDefault
        position={camPos}
        zoom={camZoom}
        near={0}
        far={10000}
        />
      <OrbitControls
        ref={controls}
        camera={ref.current}
        enablePan={true}
        enableZoom={false}
        enableRotate={true}
        zoomSpeed={0.25}
        style={{zIndex: 5}}/>
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