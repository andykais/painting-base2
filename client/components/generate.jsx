import React from 'react';
import {generatePixels} from '../libs/transformations';

class Generate extends React.Component {

  render() {
    /* get canvas data */
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let canvasData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    /* generate random pixels and set pixels in canvas */
    generatePixels(canvasData.data);
    ctx.putImageData(canvasData, 0, 0);
    return(null);
  }
}

export default Generate
