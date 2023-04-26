import * as THREE from 'three'
import React, { useRef, useLayoutEffect, useState, useMemo } from 'react'
import { Canvas, useThree, useFrame, extend, useLoader } from '@react-three/fiber'
// import { OrbitControls, OrthographicCamera, PerspectiveCamera } from '@react-three/drei';
// import { Line as DreiLine } from '@react-three/drei';
import fonts from "./Fonts";
import { total_data } from './Constants';
import { useStore } from './Store';

function Heatmap(){
  const ref = useRef();
  const temp = new THREE.Object3D()

  const size = 0.1; //size of one box
  const height = 20; //scale of value
  const rowNum = 81;

  const colors = [
    new THREE.Color("#bed88c"), new THREE.Color("#cfe6a3"), new THREE.Color("#dceeb6"),
    new THREE.Color("#eee2b6"), new THREE.Color("#fac4af"), new THREE.Color("#f0a095"),
    new THREE.Color("#e88888"), new THREE.Color("#d67881"), new THREE.Color("#e06177")
  ];

  function colorMap(value){
    let level = 0
    if(value > 0.5) level = 0
    else if(value > 0.1) level = 1
    else if(value > 0.05) level = 2
    else if(value > 0.01) level = 3
    else if(value > 0.005) level = 4
    else if(value > 0.001) level = 5
    else if(value > 0.0005) level = 6
    else if(value > 0.0001) level = 7
    else level = 8
  
    return (colors[8-level]);
  }

  useLayoutEffect(() => {
    // Set positions
    for(let i = 0; i < total_data.length; i++) {
      if(i%rowNum != 0){
        temp.position.set((total_data[i][0] - 1816) * size, total_data[i][2] * height * 0.5, (80 - total_data[i][1]) * size);
        temp.scale.set(size, total_data[i][2] * height, size);
        temp.updateMatrix()
        ref.current.setMatrixAt(i, temp.matrix);
        ref.current.setColorAt(i, colorMap(total_data[i][2]))
      }
    }
    // Update the instance
    ref.current.instanceMatrix.needsUpdate = true
  }, [])

  return (
    <instancedMesh ref={ref} args={[null, null, total_data.length]}>
      <boxGeometry />
      <meshPhongMaterial transparent={true} opacity={1} side={THREE.DoubleSide} />
    </instancedMesh>
  )
}

export { Heatmap }