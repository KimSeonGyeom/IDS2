import * as THREE from 'three'
import create from 'zustand';
// import { Static, Animated, Immersive, Sources, GIFs, DSs, Abstract } from './Constants.js';

function toFixed2(float){
  return Number.parseFloat(float).toFixed(2);
}

const useStore = create((set) => ({
  progressVal: 0,
  setProgressVal: (val) => set((state) => {
    const slider = document.getElementById('progressSlider');
    // console.log(slider);

    return {
    progressVal: toFixed2(val),
    camPos: [
      toFixed2(1000.0 - state.progressVal * 10), 
      toFixed2(1000.0 - state.progressVal * 1), 
      toFixed2(1000.0 - state.progressVal * 3)
    ],
    camZoom: toFixed2((10 + state.progressVal * 1.2)<100? 10 + state.progressVal * 1.2: 100),
  }}),

  scale: 1,
  setScale: (val) => set((state) => {return {
    scale: val
  }}),

  camPos: [1000, 1000, 1000],
  setCamPos: (val) => set((state) => {return {
    camPos: val
  }}),
  camZoom: 10,
  setCamZoom: (val) => set((state) => {return {
    camZoom: val
  }}),

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
  setRowsOfInterest: (val) => set((state) => {return { 
    rowsOfInterest: val
  }}),

  pointOfInterest: [],
  setPointOfInterest: (val) => set((state) => {
    // console.log(val);
    return {
      pointOfInterest: val
    }
  }),

  reset: (val) => set((state) => {return {
    progressVal: 0,
    scale: 1,
    camPos: [0, 0, 1000],
    camZoom: 1,
  }}),
}));

export { useStore };
