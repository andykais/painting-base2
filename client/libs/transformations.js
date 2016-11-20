/* iterate over canvas and set each pixel as random */
const generatePixels = (canvasData) => {
  for (let i = 0; i < canvasData.length; i++) {
    if (i%4 == 3) {
      canvasData[i] = 255;
    } else {
      canvasData[i] = Math.floor(Math.random() * 256);
    }
  }
}

/* for small increments (<MAXINT), just use a number for simplicitiy */
const incrementByNum = (canvasData, num, k) => {
  for (let i = k; num > 0; i++) {
    let m = canvasData[i] + num%256;
    canvasData[i] = m%256;
    num >>>= 8;
    if (m > 255) {
      num++;
    }
    if (i%4 == 2) {
      i++;
    }
  }
}

/* return string of zeros of length n */
const zeros = (n) => {
  if (n < 1) {
    return '';
  }

  var s = '';
  var fill = '0';

  while (n > 1) {
    if (n & 1) {
      s += fill;
    }
    n >>= 1;
    fill += fill;
  }
  return s + fill;
}

/* convert float n to binary string of n with length size */
const binFloat = (n) => {
  if (n >= 1) {
    return '1'+zeros(56);
  }

  let s = '';
  for (let i = 0.5; s.length < 56; i /= 2) {
    if (n >= i) {
      s += '1';
      n -= i;
    }
    else {
      s += '0';
    }
  }
  return s;
}

/* convert percent to binary increment string */
const percentToString = (percent, size) => {
  let str = binFloat(percent)+zeros(size*3*8-56);
  return str.substring(1, str.length);
}

/* for large increments, use percentage to create increment value */
const incrementByPercent = (canvasData, percent) => {
  let str = percentToString(percent, canvasData.length*3/4);

  for (let k = 0; str != ''; k++) {
    incrementByNum(canvasData, parseInt(str.substring(0, 8), 2), k);
    str = str.substring(0, str.length-8);
    if (k%4 == 2) {
      k++;
    }
  }
}

module.exports = {
  generatePixels: generatePixels,
  incrementByNum: incrementByNum,
  incrementByPercent: incrementByPercent
}
