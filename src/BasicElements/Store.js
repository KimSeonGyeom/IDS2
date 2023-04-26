import * as THREE from 'three'
import create from 'zustand';
// import { Static, Animated, Immersive, Sources, GIFs, DSs, Abstract } from './Constants.js';

const useStore = create((set) => ({
  progressVal: 0,
  setProgressVal: (val) => set((state) => {return {
    progressVal: val
  }}),

  scale: 1,
  setScale: (val) => set((state) => {return {
    scale: val
  }}),

  camPos: [0, 0, 1000],
  setCamPos: (val) => set((state) => {return {
    camPos: val
  }}),
  camZoom: 6.25,
  setCamZoom: (val) => set((state) => {return {
    camZoom: val
  }}),

  reset: (val) => set((state) => {return {
    progressVal: 0,
    scale: 1,
    camPos: [0, 0, 1000],
    camZoom: 6.25,
  }}),
}));

export { useStore };
