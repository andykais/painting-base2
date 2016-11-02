import React from 'react';

class Increment extends React.Component {

  constructor(props) {
    super(props);
  }

  getIncrArray(incr) {
    return [0]*incr.length;
  }

  /* iterate over canvas and set each pixel as random */
  incrementImage(canvas, ctx, incrData) {
    /* to do: calculate increment start position */
    let x = 100;
    let y = 100;
    let canvasData = ctx.getImageData(x, y, canvas.width, canvas.height);

    for (var i = 0; i < canvasData.data.length; i += 4) {
        canvasData.data[i] += incrData[i];
    }
    /* set new pixels in canvas */
    ctx.putImageData(canvasData, x, y);
  }

  render() {
    /* get canvas data */
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    let incrData = this.getIncrArray(2038159793284075190);
    this.incrementImage(canvas, ctx, incrData);
    return(null);
  }
}

export default Increment
