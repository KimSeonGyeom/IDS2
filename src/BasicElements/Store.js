import * as THREE from 'three'
import create from 'zustand';

import { scrollLength } from './Constants';

const MODE_EDIT_CAMERA = 1000;
const MODE_PLAY_SCROLLY = 1001;

const toFixed2 = (float) =>{
  return Number.parseFloat(float).toFixed(2);
}

const animationGenerator = (clips) =>{
  let animation = [];
  let pr0, pr1 = 0;
  let clipIdx = 0;
  let clip0, clip1;
  let interpParam = 0;
  for(let i=0; i<scrollLength ; i++){
    animation.push({})
    clipIdx = clips.findIndex((e) => e.progress > i * 100 / scrollLength);
    clip0 = clips[clipIdx - 1];
    clip1 = clips[clipIdx];
    pr0 = Math.floor(clip0.progress * scrollLength / 100);
    pr1 = Math.floor(clip1.progress * scrollLength / 100);
    interpParam = (i - pr0) / (pr1 - pr0)
    Object.keys(clip0).forEach((key) =>{
      animation[i][key] = clip1[key] * interpParam + clip0[key] * (1 - interpParam)
    })
  }
  animation.push({});
  Object.keys(clip1).forEach((key) =>{
    animation[scrollLength][key] = clip1[key]
  })
  console.log(animation);
  return animation;
}

const useCanvasStore = create((set) => ({
  mode: MODE_PLAY_SCROLLY,
  progressVal: 0,
  setMode: (val) => set((state) => {return { mode: val }}),
  setProgressVal: (val) => set((state) => {return { progressVal: val }}),

  spec: {
    'camX': 1000,
    'camY': 1000,
    'camZ': 1000,
    'lookX': 0,
    'lookY': 0,
    'lookZ': 0,
    'zoom': 10,
  },
  setSpec: (name, val) => set((state) => {return { spec: { ...state.spec, [name]: val }}}),
  setWholeSpec: (val) => set((state) => { return { spec: val }}),
}))

const usePOIStore = create((set) => ({
  // x: 1816 - 2019
  // y: 0 - 0.25
  // z: 0 - 80
  rowsOfInterest: [
    { id: 1, x: 1990, y: 0.01, z: 40 },
    { id: 2, x: 1930, y: null, z: 60 },
    { id: 3, x: 1950, y: 0.005, z: null },
    { id: 4, x: 1940, y: null, z: null },
    { id: 5, x: null, y: 0.007, z: 5 },
    { id: 6, x: null, y: null, z: 20 },
    { id: 7, x: null, y: 0.01, z: null },
  ],
  setRowsOfInterest: (val) => set((state) => {return { rowsOfInterest: val }}),

  pointOfInterest: [],
  setPointOfInterest: (val) => set((state) => {return { pointOfInterest: val }}),
}));

const useClipStore = create((set) => ({
  animation: new Array(scrollLength).fill({
    "progress": 0,
    "camX": 1000,
    "camY": 1000,
    "camZ": 0,
    "camZoom": 10,
  }),
  cam: [
    {
      "id": 0,
      "progress": 0,
      "camX": 1000,
      "camY": 1000,
      "camZ": 1000,
      "camZoom": 10,
    },
    {
      "id": 1,
      "progress": 40,
      "camX": 500,
      "camY": 1000,
      "camZ": -1000,
      "camZoom": 10,
    },
    {
      "id": 2,
      "progress": 100,
      "camX": 1000,
      "camY": 900,
      "camZ": 300,
      "camZoom": 100,
    }
  ],

  addCam: (val) => set((state) => {
    let newCam = state.cam.concat([{
      "id": state.cam.length,
      "progress": Number.parseFloat(val.progress).toFixed(2),
      "camX": Number.parseFloat(val.camX).toFixed(2),
      "camY": Number.parseFloat(val.camY).toFixed(2),
      "camZ": Number.parseFloat(val.camZ).toFixed(2),
      "camZoom": Number.parseFloat(val.zoom).toFixed(2),
    }]).sort((a, b) => a.progress - b.progress);

    return { 
      cam: newCam,
      animation: animationGenerator(newCam)
    }
  }),

  getAnimation: () => set((state) => {return {animation: animationGenerator(state.cam)}}),
}));

export { toFixed2, MODE_EDIT_CAMERA, MODE_PLAY_SCROLLY, useCanvasStore, usePOIStore, useClipStore };
