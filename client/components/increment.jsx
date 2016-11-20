import React from 'react';
import {incrementByNum} from '../libs/transformations';
import {incrementByPercent} from '../libs/transformations';

class Increment extends React.Component {

  render() {
    /* get canvas data */
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let canvasData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    /* increment image using array generated from input number */
    // incrementByNum(canvasData.data, 48120939, 0);
    incrementByPercent(canvasData.data, 0.51);

    /* set new pixels in canvas */
    ctx.putImageData(canvasData, 0, 0);
    return(null);
  }
}

export default Increment
