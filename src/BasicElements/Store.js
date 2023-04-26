import * as THREE from 'three'
import create from 'zustand';
// import { Static, Animated, Immersive, Sources, GIFs, DSs, Abstract } from './Constants.js';

const useStore = create((set) => ({
  progressVal: 0,
  setProgressVal: (val) => set((state) => {return {
    progressVal: val,
    camPos: [1000 - state.progressVal * 10, 1000 - state.progressVal * 1, 1000 - state.progressVal * 3],
    camZoom: (10 + state.progressVal * 1.2)<100? 10 + state.progressVal * 1.2: 100,
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

  reset: (val) => set((state) => {return {
    progressVal: 0,
    scale: 1,
    camPos: [0, 0, 1000],
    camZoom: 1,
  }}),
}));

export { useStore };
