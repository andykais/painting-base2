import React from 'react';

class Increment extends React.Component {

  /* increment each pixel as needed */
  incrementImage(ctx, canvasData, incr) {
    for (let i = 0; incr > 0; i++) {
      let m = canvasData.data[i] + incr%256;
      canvasData.data[i] = m%256;
      incr >>>= 8;
      if (m > 255) {
        incr++;
      }
      if (i%4 == 2) {
        i++;
      }
    }
    /* set new pixels in canvas */
    ctx.putImageData(canvasData, 0, 0);
  }

  render() {
    /* get canvas data */
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let canvasData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    /* increment image using array generated from input number */
    this.incrementImage(ctx, canvasData, num);
    return(null);
  }
}

export default Increment
