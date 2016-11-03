import React from 'react';

class Increment extends React.Component {

  constructor(props) {
    super(props);
  }

  getIncrArray(incr) {
    let incrArray = [];
    let n = 0;
    let i = 8;
    while (incr != '') {
      i = 8;
      n = parseInt(incr.slice(0,i), 10);
      if (n > 16777215) {
        i = 7;
        n = parseInt(incr.slice(0,i), 10);
      }
      incrArray.push(n & 255);
      incrArray.push((n >>> 8) & 255);
      incrArray.push((n >>> 16) & 255);
      incr = incr.slice(i, incr.length);
    }
    return incrArray;
  }

  /* iterate over canvas and increment each pixel as needed */
  incrementImage(ctx, canvasData, incrArray) {
    let j = 0;
    for (let i = 0; i < incrArray.length; i += 3) {
      let m0 = canvasData.data[j] + incrArray[i];
      let m1 = canvasData.data[j+1] + incrArray[i+1];
      let m2 = canvasData.data[j+2] + incrArray[i+2];
      if (m0 > 255) {
        m1++;
      }
      if (m1 > 255) {
        m2++;
      }
      if (m2 > 255) {
        incrArray[i+3]++;
      }
      canvasData.data[j] = m0%256;
      canvasData.data[j+1] = m1%256;
      canvasData.data[j+2] = m2%256;
      j += 4;
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
    this.incrementImage(ctx, canvasData, this.getIncrArray('458172409875108937180568109237408914650837481093758091236410274587947843056812740932784'));
    return(null);
  }
}

export default Increment
