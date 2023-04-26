import * as THREE from 'three'
import React, { useRef, useLayoutEffect, useState, useMemo } from 'react'
import { Canvas, useThree, useFrame, extend, useLoader } from '@react-three/fiber'
// import { OrbitControls, OrthographicCamera, PerspectiveCamera } from '@react-three/drei';
// import { Line as DreiLine } from '@react-three/drei';
import fonts from "./Fonts";
import { useStore } from './Store';

function Bar(props) {
  const meshRef = useRef();
  const scale = useStore((state) => state.scale);

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={[scale, props.height, scale]}
      position={[props.x * scale, props.height / 2, props.z * scale]}
    >
      <boxGeometry />
      <meshStandardMaterial color={props.color} />
    </mesh>
  );
}

function Chart(props) {
  const progressVal = useStore((state) => state.progressVal);
  const data = [2, 4, 6, 8, 10];
  const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF"];
  const groupRef = useRef();

  const bars = data.map((d, i) => (
    <Bar key={i} x={i} height={d} z={0} color={colors[i]} />
  ));

  return <group ref={groupRef} position={[0, 0, 0]}> {bars} </group>;
}

export { Chart }