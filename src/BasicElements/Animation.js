import React, { useRef } from 'react'

/*
function transitionsExtender(transitions, target, lastFrame){
  let newTransitions = [];
  transitions.forEach(element =>{
    if(element.target == target){
      newTransitions.push(element);
    }
  });
  for(let i=0; i<=lastFrame; i++){
    let now = newTransitions.find(element => element.from.frame <= i && element.to.frame > i);
    if(now == undefined){ // is not included in any of transitions
      for(let j=i; j<=lastFrame; j++){ // then find nearest next transition
        let nextTransition = newTransitions.find(element => element.from.frame == j);
        if(nextTransition != undefined){
          newTransitions.push({
            "target": target,
            "from": {"frame": i, "clip": nextTransition.from.clip},
            "to": {"frame": j, "clip": nextTransition.from.clip},
            "easing": "bezier", "motion": {"type": "linear"}
          });
          break; // if found, break for loop and keep searching not included frame(i)
        }else if(nextTransition == undefined && j==lastFrame && i!=lastFrame){
          // if not found until the last, copy the last clip
          let nextTransition = newTransitions.find(element => element.to.frame == i);
          newTransitions.push({
            "target": target,
            "from": {"frame": i, "clip": nextTransition.to.clip},
            "to": {"frame": lastFrame, "clip": nextTransition.to.clip},
            "easing": "bezier", "motion": {"type": "linear"}
          });
        }
      }
    }
  }
  return newTransitions;
}

function getClipData(clips, target, name){
  return clips.find(element => (element.target == target && element.name == name));
}

function interpolate(startVal, endVal, duration, time, postType, motion){
  function calcInterpolation(startVal, endVal, progress, postType){
    let easedVal = (postType == 'bezier')? startVal + (endVal - startVal) * bezierFunc(progress) :
      (postType == 'stopper')? startVal :
      (postType == 'linear')? startVal + (endVal - startVal) * progress : progress
    return easedVal;
  }

  const bezier = require('bezier-easing');
  const bezierFunc = bezier(0.4, 0, 0.4, 1);
  const progress = time / duration;

  let interpolatedVal = {};
  for(const property in startVal){
    if(Array.isArray(startVal[property])){
      let arr = [];
      for(let i=0; i<startVal[property].length; i++){
        arr.push(calcInterpolation(startVal[property][i], endVal[property][i], progress, postType, motion));
      }
      interpolatedVal[property] = arr;
    }else if(property != "target" && property != "name"){
      interpolatedVal[property] = calcInterpolation(startVal[property], endVal[property], progress, postType, motion);
    }
  }

  for(let i=0; i<motion.length; i++){
    let currentMotion = motion[i];
    if(currentMotion.type == "sin"){
      interpolatedVal[currentMotion.attribute][currentMotion.args.axis] += currentMotion.args.height * Math.sin(bezierFunc(progress) * Math.PI);
    }
    if(currentMotion.type == "-sin"){
      interpolatedVal[currentMotion.attribute][currentMotion.args.axis] += currentMotion.args.height * (-Math.sin(bezierFunc(progress) * Math.PI));
    }
    if(currentMotion.type == "-skewedSine"){
      let x = bezierFunc(progress) * Math.PI;
      interpolatedVal[currentMotion.attribute][currentMotion.args.axis] += currentMotion.args.height * (-Math.sin(x + Math.sin(x) / currentMotion.args.skewness));
    }
  }

  interpolatedVal.name = startVal.name;
  interpolatedVal.target = startVal.target;
  // console.log(interpolatedVal);

  return interpolatedVal;
}

function statesConverter(initStates, stoppers){
  let states = [];
  // Required!!!  states[0] = 0, states[-1] = 1
  for(let i=0; i<initStates.length; i++){
    if(i == 0){
      states.push(initStates[i]);
      states.push(initStates[i] + stoppers[i]);
    }else if(i == initStates.length - 1){
      states.push(initStates[i] - stoppers[i]);
      states.push(initStates[i]);
    }else{
      states.push(initStates[i] - stoppers[i]);
      states.push(initStates[i]);
      states.push(initStates[i] + stoppers[i]);
    }
  }
  return states;
}

function getTargets(transitions){
  let targets = [];
  for(let i=0; i<transitions.length; i++){
    if(!targets.includes(transitions[i].target)){
      targets.push(transitions[i].target);
    }
  }
  return targets;
}

function AnimationGenerator(totalFrame, initStates, stoppers, clips, transitions){
  let targets = getTargets(transitions);
  let states = statesConverter(initStates, stoppers);
  let animations = [];

  for(let t=0; t<targets.length; t++){
    let newTransition = transitionsExtender(transitions, targets[t] ,initStates.length - 1);
    let animation = [];
    for(let i=0; i<totalFrame; i++){
      let currentStep = states.findIndex((ele) => ele > i / totalFrame) - 1;
      let timeframe = Math.floor((currentStep+1)/3);
      let transition = newTransition.find(element => (element.from.frame*3 <= currentStep && element.to.frame*3 > currentStep));
      let startClip = getClipData(clips, targets[t], transition.from.clip);
      let endClip = getClipData(clips, targets[t], transition.to.clip);

      if(currentStep == transition.from.frame*3){
        animation = animation.concat(startClip);
      }else if(currentStep == transition.to.frame*3-1){
        animation = animation.concat(endClip);
      }else{
        animation = animation.concat(interpolate(
          startClip,
          endClip,
          states[transition.to.frame*3-1]-states[transition.from.frame*3+1],
          i/totalFrame-states[transition.from.frame*3+1],
          transition.easing,
          transition.motion
        ));
      }
    }
    animations.push({
      "target": targets[t],
      "animation": animation
    });
  }
  // console.log(animations);
  return animations;
}
*/

function If(props){
  return <>{props.if && props.children}</>;
};


function Lerp(sVal, eVal, alpha){
  return sVal * (1 - alpha) + eVal * alpha;
}

export {If, Lerp};