import React from 'react';

class Increment extends React.Component {

  constructor(props) {
    super(props);
  }

  getIncrArray(incr) {
    incr = ('000000000000000000000000').slice(incr%24)+incr;
    let incrArray = [];
    while (incr != '') {
      incrArray.push(parseInt(incr.slice(-8), 2));
      incrArray.push(parseInt(incr.slice(-16,-8), 2));
      incrArray.push(parseInt(incr.slice(-24,-16), 2));
      incrArray.push(256);
      incr = incr.slice(0,-24);
    }
    return incrArray;
  }

  /* iterate over canvas and increment each pixel as needed */
  incrementImage(ctx, canvasData, incrArray) {
    for (var i = 0; i < incrArray.length; i++) {
      let m = canvasData.data[i] + incrArray[i];
      canvasData.data[i] = m%256;
      if (m > 255) {
        if (i%4 == 2) {
          incrArray[i+2] += 1;
        }
        else {
          incrArray[i+1] += 1;
        }
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
    this.incrementImage(ctx, canvasData, this.getIncrArray('10101101010101010100000000000111110101010010100011011110101010111001001010101010010110101010101010111111101000101110100101010010010010101101'));
    return(null);
  }
}

export default Increment
