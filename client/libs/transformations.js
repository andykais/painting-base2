/* ------------------------------------------------------------- */
/*           transformations between canvas and number           */
/* ------------------------------------------------------------- */

/* make canvas white */
const blankOutCanvas = (canvasData) => {
  canvasData.forEach(function (val, i, arr) {
    arr[i] = 200
  })
}

/* put binary string in canvas */
const stringToCanvas = (str, canvasData) => {
  let size = canvasData.length/4;
  if (str.length < size) {
    str = strFill(size-str.length, '0') + str;
  } else {
    str = str.substring(str.length - size, str.length);
  }

  let j = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] == '1') {
      canvasData[j] = 255;
      canvasData[j+1] = 255;
      canvasData[j+2] = 255;
    } else {
      canvasData[j] = 0;
      canvasData[j+1] = 0;
      canvasData[j+2] = 0;
    }
    canvasData[j+3] = 255;
    j += 4;
  }
}

/* convert canvas to string of binary values */
const canvasToString = (canvasData) => {
  let str = '';
  for (let i = 0; i < canvasData.length; i += 4) {
    if (canvasData[i] == 255) {
      str += '1';
    } else {
      str += '0';
    }
  }
  return str;
}

/* convert binary string to base 10 string */
const stringToNumber = (str) => {
  let num = '';
  if (str.length%4 != 0) {
    str = strFill(4-str.length%4, '0') + str;
  }
  for (let i = 0; i < str.length; i += 4) {
    let s1 = str.substring(i, i+4);
    if (s1 == '1110') {
      num += '8';
    } else if (s1 == '1111') {
      num += '9';
    } else {
      num += parseInt(s1, 2).toString(10);
    }
  }
  return num;
}

/* convert base 10 string to binary string */
const numberToString = (num) => {
  let str = '';
  for (let i = 0; i < num.length; i++) {
    let s1 = parseInt(num[i]);
    if (s1 == 8) {
      str += '1110';
    } else if (s1 == 9) {
      str += '1111';
    } else {
      s1 = s1.toString(2);
      str += strFill(4-s1.length, '0') + s1;
    }
  }
  return str;
}

/* get percentage point of string in image space */
const getPercent = (str) => {
  let percent = 0;
  let p = 0.5;
  for (let i = 0; i < 20; i++) {
    if (str[i] == '1') {
      percent += p;
    }
    p /= 2;
  }
  return Math.round((percent + 0.000001) * 1000) / 1000;
}

/* ------------------------------------------------------------- */
/*                       binary operations                       */
/* ------------------------------------------------------------- */

/* binary addition s1+s2 */
const addBin = (s1, s2, inc=true) => {
  if (inc == false) {
    return subBin(s1, s2);
  }
  if (s1.length < s2.length) {
    return addBin(s2, s1);
  }
  if (s2 == '') {
    return s1;
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
  if (str[0] == '1') {
    return strFill(s1.length-1, '1');
  }
  return str.substring(1, str.length);
}

/* binary subtraction s1-s2 */
const subBin = (s1, s2) => {
  if (s1.length < s2.length) {
    return subBin(s2, s1);
  }
  if (s2 == '') {
    return s1;
  }

  s1 = '0' + s1;
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
  if (str[0] == '1') {
    return strFill(str.length-1, '0');
  }
  return str.substring(1, str.length);
}

/* ------------------------------------------------------------- */
/*                       string generators                       */
/* ------------------------------------------------------------- */

/* generate random binary string */
const generateRandomString = (size, prob=0.5) => {
  let str = '';
  for (; size > 0; size--) {
    if (Math.random() >= prob) {
      str += '1';
    } else {
      str += '0';
    }
  }
  return str;
}

/* return string of fill of length n */
const strFill = (n, fill) => {
  let s = '';
  while (n >= 1) {
    if (n & 1) {
      s += fill;
    }
    n >>= 1;
    fill += fill;
  }
  return s;
}

/* ------------------------------------------------------------- */
/*                     canvas modifications                      */
/* ------------------------------------------------------------- */

/* move to new percentage point */
const moveToPercent = (str, percent) => {
  if (percent == 1) {
    return strFill(str.length, '1');
  } else if (percent == 0) {
    return strFill(str.length, '0');
  }

  let change = percent - getPercent(str);
  let inc = (change > 0);

  change = Math.abs(change).toString(2).substring(2, 22);
  change += generateRandomString(Math.ceil(str.length*percent), percent);
  return addBin(str, change, inc);
}

/* increment/decrement by a small number (< MAXINT) */
const incrementByNumber = (str, num) => {
  return addBin(str, Math.abs(num).toString(2), (num < 0));
}

module.exports = {
  blankOutCanvas,
  stringToCanvas,
  canvasToString,
  stringToNumber,
  numberToString,
  getPercent,
  generateRandomString,
  moveToPercent,
  incrementByNumber
}
