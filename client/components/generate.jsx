import React from 'react';

class Generate extends React.Component {

  constructor(props) {
    super(props);
  }

  /* iterate over canvas and set each pixel as random */
  generatePixels(canvas, ctx, canvasData) {
    for (var i = 0; i < canvasData.data.length; i += 4) {
      canvasData.data[i] = Math.floor(Math.random() * 256);
      canvasData.data[i+1] = Math.floor(Math.random() * 256);
      canvasData.data[i+2] = Math.floor(Math.random() * 256);
      canvasData.data[i+3] = 255;
    }
    /* set random pixels in canvas */
    ctx.putImageData(canvasData, 0, 0);
  }

  render() {
    /* get canvas data */
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let canvasData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    /* generate random pixels */
    this.generatePixels(canvas, ctx, canvasData);
    return(null);
  }
}
export default Generate
