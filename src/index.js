import React, { useLayoutEffect, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { shallow } from 'zustand/shallow'
import './index.css';
import THREECanvas from './Components/Canvas';
import Inspector from './Components/Inspector';
import Animator from './Components/Animator';
// import reportWebVitals from './reportWebVitals';

import { scrollLength } from './BasicElements/Constants'

import { useCanvasStore, useClipStore } from './BasicElements/Store';

function CanvasBox() {
  const [setTarget, setProgressVal] = useCanvasStore((state) => [state.setTarget, state.setProgressVal], shallow);
  const [getAnimation] = useClipStore((state) => [state.getAnimation], shallow);

  const requestRef = React.useRef();
  const previousTimeRef = React.useRef();

  const animate = time => {
    if (previousTimeRef.current != undefined) {
      setTarget(document.getElementById("scroller").scrollTop);
      setProgressVal();
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
    <div id={"scroller"}>
      <div id={"canvas"}>
        <THREECanvas frameloop="demand" />
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
