import React, { useLayoutEffect, Suspense, forwardRef, useRef } from 'react';
import { Canvas } from '@react-three/fiber'

import ReactDOM from 'react-dom/client';
import { shallow } from 'zustand/shallow'
import './index.css';
import THREECanvas from './Components/THREECanvas';
import Inspector from './Components/Inspector';
import Animator from './Components/Animator';
// import reportWebVitals from './reportWebVitals';

import { MODE_PLAY_SCROLLY, useCanvasStore, useClipStore } from './BasicElements/Store';
import { scrollLength } from './BasicElements/Constants';


const Overlay = forwardRef(({ caption, scroll }, ref) => (
  <div
    ref={ref}
    onScroll={(e) => {
      scroll.current = e.target.scrollTop;
    }}
    class="scroll">
    <div style={{ height: "400vh" }}>
      <div class="dot">
        <h1>headset</h1>
        Virtual reality (VR) is a simulated experience that can be similar to or completely different from the real world.
      </div>
    </div>
    <div style={{ height: "200vh" }}>
      <div class="dot">
        <h1>headphone</h1>
        Headphones are a pair of small loudspeaker drivers worn on or around the head over a user's ears.
      </div>
    </div>
    <div style={{ height: "200vh" }}>
      <div class="dot">
        <h1>rocket</h1>A rocket (from Italian: rocchetto, lit. 'bobbin/spool')[nb 1][1] is a projectile that spacecraft, aircraft or other vehicle use to obtain thrust from a
        rocket engine.
      </div>
    </div>
  </div>
))

function CanvasBox() {
  // const overlay = useRef();
  // const scroll = useRef(0);

  const [getAnimation] = useClipStore((state) => [state.getAnimation], shallow);
  const [mode, setProgressVal] = useCanvasStore((state) => [state.mode, state.setProgressVal], shallow);

  const requestRef = React.useRef();
  const previousTimeRef = React.useRef();

  const animate = time => {
    if (previousTimeRef.current != undefined) {
      setProgressVal(Math.floor(document.getElementById("scroller").scrollTop));
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }

  useLayoutEffect(() => {
    getAnimation();

    document.getElementById("dummy").style.height = scrollLength + "px";
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return(
    <div id={"scroller"} style={{overflow: mode==MODE_PLAY_SCROLLY? 'scroll':'hidden'}}>
      <div id={"canvas"}>
        <Suspense fallback={<div>Now Loading</div>}>
          <Canvas>
            <THREECanvas frameloop="demand" />
          </Canvas>
        </Suspense>
      </div>
      <div id={"dummy"}> . </div>
    </div>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="container">
      <div className="upper-container">
        <div className="canvas-parent box">
          <Suspense fallback={<div>Now Loading</div>}>
            <CanvasBox />
          </Suspense>
        </div>
        <div className="inspector box">
          <Inspector />
        </div>
      </div>
      <div className="lower-container">
        <div className="animator box">
          <Animator />
        </div>
      </div>
    </div>
  </React.StrictMode>
);
