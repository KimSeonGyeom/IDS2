import * as THREE from 'three'
import React, { useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, OrthographicCamera } from '@react-three/drei';
import { useStore } from './Store';

const OrthoCamera = React.forwardRef((props, ref) => {
  const mainCamera = useRef();
  const controls = useRef();

  const camPos = useStore((state) => state.camPos);
  const setCamPos = useStore((state) => state.setCamPos);
  const camZoom = useStore((state) => state.camZoom);
  const setCamZoom = useStore((state) => state.setCamZoom);

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