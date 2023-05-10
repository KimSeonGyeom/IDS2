import React, { useLayoutEffect, Suspense, forwardRef, useRef } from 'react';
import { Canvas } from '@react-three/fiber'

import ReactDOM from 'react-dom/client';
import { shallow } from 'zustand/shallow'
import './index.css';
import THREECanvas from './Components/THREECanvas';
import Inspector from './Components/Inspector';
import Animator from './Components/Animator';
// import reportWebVitals from './reportWebVitals';

import { useClipStore } from './BasicElements/Store';

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
  const overlay = useRef();
  const caption = useRef();
  const scroll = useRef(0);

  const [getAnimation] = useClipStore((state) => [state.getAnimation], shallow);

  useLayoutEffect(() => {
    getAnimation();
  }, []);

  return(
    <div id={"canvasContainer"}>
      <div id={"canvas"}>
        <Canvas>
          <THREECanvas scroll={scroll} frameloop="demand" />
        </Canvas>
        <Overlay ref={overlay} caption={caption} scroll={scroll} />
      </div>
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
