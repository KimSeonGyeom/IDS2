import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Canvas from './Components/Canvas';
import Inspector from './Components/Inspector';
import Animator from './Components/Animator';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="container">
      <div className="upper-container">
        <div className="canvas-parent box">
          <Suspense fallback={<div>Now Loading</div>}>
            <Canvas />
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
