import React from 'react';

class Increment extends React.Component {

  constructor(props) {
    super(props);
  }

  /* iterate over canvas and set each pixel as random */
  generatePixels(canvas, ctx, canvasData, incr) {
    let n = canvas.width*4;
    for (var i = 0; i < n; i += 4) {
      for (var j = 0; j < canvas.height*n; j += n) {
        canvasData.data[i+j] = Math.floor(Math.random() * 256);
        canvasData.data[i+j+1] = Math.floor(Math.random() * 256);
        canvasData.data[i+j+2] = Math.floor(Math.random() * 256);
        canvasData.data[i+j+3] = 255;
      }
    }
    /* set random pixels in canvas */
    ctx.putImageData(canvasData, 0, 0);
  }

  render() {
    /* get canvas data */
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let canvasData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    incrementImage(canvas, ctx, canvasData, incr);
    return(null);
  }
