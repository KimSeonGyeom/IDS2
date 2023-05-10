import * as THREE from 'three'
import React, { useRef, useEffect, useLayoutEffect, useState, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'


// import { Canvas, useThree, useFrame, extend, useLoader } from '@react-three/fiber'
// import { OrbitControls, OrthographicCamera, PerspectiveCamera } from '@react-three/drei';
// import { Line as DreiLine } from '@react-three/drei';
// import fonts from "./Fonts";
import { total_data } from './Constants';
import { usePOIStore } from './Store';

function Heatmap(){
  const ref = useRef();
  const { gl } = useThree();
  const temp = new THREE.Object3D()

  const pointOfInterest = usePOIStore((state) => state.pointOfInterest);

  const size = 0.1; //size of one box
  const height = 20; //scale of value
  const rowNum = 81;

  let x = null;
  let y = null;
  let z = null;

  const colors = [
    new THREE.Color("#bed88c"), new THREE.Color("#cfe6a3"), new THREE.Color("#dceeb6"),
    new THREE.Color("#eee2b6"), new THREE.Color("#fac4af"), new THREE.Color("#f0a095"),
    new THREE.Color("#e88888"), new THREE.Color("#d67881"), new THREE.Color("#e06177")
  ];
  
  function colorMap(value){
    if(value > 0.5) return colors[8];
    else if(value > 0.1) return colors[7];
    else if(value > 0.05) return colors[6];
    else if(value > 0.01) return colors[5];
    else if(value > 0.005) return colors[4];
    else if(value > 0.001) return colors[3];
    else if(value > 0.0005) return colors[2];
    else if(value > 0.0001) return colors[1];
  
    return colors[0];
  }

  useLayoutEffect(() => {
    for(let i = 0; i < total_data.length; i++) {
      x = total_data[i][0];
      y = total_data[i][2]
      z = 80 - total_data[i][1];

      temp.position.set((x - 1816) * size, y * height * 0.5, z * size);
      temp.scale.set(size, y * height, size);
      temp.updateMatrix()
      ref.current.setMatrixAt(i, temp.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true
  }, [])

  useEffect(() => {
    for(let i = 0; i < total_data.length; i++) {
      x = total_data[i][0];
      y = total_data[i][2];
      z = 80 - total_data[i][1];

      ref.current.setColorAt(i, colorMap(y));
      if(pointOfInterest.length != 0){
        for(let j=0; j < pointOfInterest.length; j++){
          if(
            (pointOfInterest[j].x == null || pointOfInterest[j].x == x) && 
            (pointOfInterest[j].y == null || Math.abs(pointOfInterest[j].y - y) < 0.01) && 
            (pointOfInterest[j].z == null || pointOfInterest[j].z == z)
          ){
            ref.current.setColorAt(i, new THREE.Color("#000000"))
          }
        }
      }
    } 
    ref.current.instanceColor.needsUpdate = true
    console.log()
  }, [pointOfInterest.length])

  useEffect(() => {
    console.log(gl.info.render);
  }, [gl.info.render])

  return (
    <instancedMesh ref={ref} args={[null, null, total_data.length]}>
      <boxGeometry />
      <meshPhongMaterial transparent={true} opacity={1} side={THREE.DoubleSide} />
    </instancedMesh>
  )
}

export { Heatmap }