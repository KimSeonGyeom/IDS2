import * as THREE from 'three'
import create from 'zustand';

import { scrollLength } from './Constants';

const toFixed2 = (float) =>{
  return Number.parseFloat(float).toFixed(2);
}

const animationGenerator = (clips) =>{
  let animation = [];
  let iProgress = 0;
  let clipIdx = 0;
  let clip0, clip1;
  let interpParam = 0;
  for(let i=0; i<scrollLength; i++){
    animation.push({})
    iProgress = i * 100 / scrollLength;
    clipIdx = clips.findIndex((e) => e.progress <= iProgress);
    clip0 = clips[clipIdx];
    clip1 = clips[clipIdx + 1];
    interpParam = (iProgress - clip0.progress) / (clip1.progress - clip0.progress)
    Object.keys(clip0).forEach((key) =>{
      animation[i][key] = clip1[key] * interpParam - clip0[key] * (1 - interpParam)
    })
  }
  return animation;
}

const useCanvasStore = create((set) => ({
  progressVal: 0,
  setProgressVal: (val) => set((state) => {
    return {
    progressVal: toFixed2(val),
    // camPosX: toFixed2(1000.0 - state.progressVal * 10), 
    // camPosY: toFixed2(1000.0 - state.progressVal * 1), 
    // camPosZ: toFixed2(1000.0 - state.progressVal * 3),
    // camZoom: toFixed2((10 + state.progressVal * 1.2)<100? 10 + state.progressVal * 1.2: 100),
  }}),

  camPosX: 1000, setCamPosX: (val) => set((state) => {return { camPosX: parseFloat(val) }}),
  camPosY: 1000, setCamPosY: (val) => set((state) => {return { camPosY: parseFloat(val) }}),
  camPosZ: 1000, setCamPosZ: (val) => set((state) => {return { camPosZ: parseFloat(val) }}),
  camZoom: 10, setCamZoom: (val) => set((state) => {return { camZoom: parseFloat(val) }}),
}));

const usePOIStore = create((set) => ({
  // x: 1816 - 2019
  // y: 0 - 0.25
  // z: 0 - 80
  rowsOfInterest: [
    { id: 1, x: 1990, y: 0.01, z: 40 },
    { id: 2, x: 1930, y: null, z: 60 },
    { id: 3, x: 1950,  y: 0.005, z: null },
    { id: 4, x: 1940,  y: null, z: null },
    { id: 5, x: null,  y: 0.007, z: 5 },
    { id: 6, x: null, y: null, z: 20 },
    { id: 7, x: null, y: 0.01, z: null },
  ],
  setRowsOfInterest: (val) => set((state) => {return { rowsOfInterest: val }}),

  pointOfInterest: [],
  setPointOfInterest: (val) => set((state) => {return { pointOfInterest: val }}),

  reset: (val) => set((state) => {return {
    progressVal: 0,
    scale: 1,
    camPos: [0, 0, 1000],
    camZoom: 1,
  }}),
}));

const useClipStore = create((set) => ({
  animation: new Array(scrollLength).fill({
    "progress": 0,
    "camX": 1000,
    "camY": 1000,
    "camZ": 1000,
    "camZoom": 10,
  }),
  cam: [
    {
      "progress": 0,
      "camX": 1000,
      "camY": 1000,
      "camZ": 1000,
      "camZoom": 10,
    },
    {
      "progress": 100,
      "camX": 1000,
      "camY": 900,
      "camZ": 700,
      "camZoom": 100,
    }
  ],

  getAnimation: () => set((state) => {return {animation: animationGenerator(state.cam)}}),
}));

export { useCanvasStore, usePOIStore, useClipStore };
