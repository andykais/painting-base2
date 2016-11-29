/* ------------------------------------------------------------- */
/*           transformations between canvas and number           */
/* ------------------------------------------------------------- */

/* put binary string in canvas */
const stringToCanvas = (str, canvasData) => {
  let size = canvasData.length*6;
  if (str.length <= size) {
    str = strFill(size-str.length, '0') + str;
  } else {
    str = str.substring(str.length - size, str.length);
  }

  let i = 0;
  let j = 0;
  while (i < str.length) {
    if (j%4 == 3) {
      canvasData[j] = 255;
    } else {
      canvasData[j] = parseInt(str.substring(i, i+8), 2);
      i += 8;
    }
    j++;
  }
}

/* convert canvas to string of binary values */
const canvasToString = (canvasData) => {
  let str = '';
  for (let i = 0; i < canvasData.length; i++) {
    if (i%4 == 3) {
      continue;
    }
    let s1 = canvasData[i].toString(2);
    str += strFill(8-s1.length, '0') + s1;
  }
  return str;
}

/* convert binary string to base 10 string */
const stringToNumber = (str) => {
  let num = '';
  for (let i = 0; i < str.length; i += 24) {
    let s1 = parseInt(str.substring(i, i+24), 2).toString(10);
    if (s1.length == 8 && i > 0) {
      let n = parseInt(num.substring(num.length-7, num.length), 10) + 1;
      num = num.substring(0, num.length-7) + n.toString(10).substring(0, 7);
    }
    s1 = s1.substring(0, 7);
    num += strFill(7-s1.length, '0') + s1;
  }
  return num;
}

/* ------------------------------------------------------------- */
/*                       binary operations                       */
/* ------------------------------------------------------------- */

/* binary addition s1+s2 */
const addBin = (s1, s2) => {
  if (s1.length < s2.length) {
    return addBin(s2, s1);
  }

  s1 = '0' + s1;
  s2 = strFill(s1.length-s2.length, '0') + s2;

  let str = '';
  let carry = 0;

  for (let i = s1.length - 1; i >= 0; i--) {
    let num = parseInt(s1[i]) + parseInt(s2[i]) + carry;
    if (num == 1 || num == 3) {
      str = '1' + str;
    } else {
      str = '0' + str;
    }
    if (num > 1) {
      carry = 1;
    } else {
      carry = 0;
    }
  }
  return str;
}

/* binary subtraction s1-s2 */
const subBin = (s1, s2) => {
  if (s1.length < s2.length) {
    return subBin(s2, s1);
  }

  s2 = strFill(s1.length-s2.length, '0') + s2;
  let str = '';
  let carry = 0;

  for (let i = s1.length - 1; i >= 0; i--) {
    let num = parseInt(s1[i]) - parseInt(s2[i]) - carry;
    if (num == 1 || num == -1) {
      str = '1' + str;
    } else {
      str = '0' + str;
    }
    if (num < 0) {
      carry = 1;
    } else {
      carry = 0;
    }
  }
  return str;
}

/* ------------------------------------------------------------- */
/*                       string generators                       */
/* ------------------------------------------------------------- */

/* generate random binary string */
const generateRandomString = (size) => {
  let str = '';
  for (; size > 0; size--) {
    str += Math.round(Math.random()).toString(2);
  }
  return str;
}

/* return string of fill of length n */
const strFill = (n, fill) => {
  if (n < 1) {
    return '';
  }

  let s = '';
  while (n > 1) {
    if (n & 1) {
      s += fill;
    }
    n >>= 1;
    fill += fill;
  }
  return s + fill;
}

/* move to new percentage point */
const moveToPercent = (percent, str) => {
  let black = (percent < 0.5);
  percent = Math.floor(str.length*2*Math.abs(percent-0.5));

  if (black) {
    return strFill(percent, '0') + generateRandomString(str.length-percent) /*str.substring(percent, str.length);*/;
  } else {
    return generateRandomString(str.length-percent) /*str.substring(0, str.length-percent)*/ + strFill(percent, '1');
  }

  // black and white
  // move through 16 different alpha's for each pixel
}

/* increment/decrement by a small number (< MAXINT) */
const incrementByNum = (num, str) => {
  if (num < 0) {
    return decrementByNum(-1*num, str);
  }
  return addBin(str, num.toString(2));
}

/* decrement by a small number */
const decrementByNum = (num, str) => {
  return subBin(str, num.toString(2));
}

module.exports = {
  stringToCanvas: stringToCanvas,
  canvasToString: canvasToString,
  stringToNumber: stringToNumber,
  generateRandomString: generateRandomString,
  moveToPercent: moveToPercent,
  incrementByNum: incrementByNum
}
