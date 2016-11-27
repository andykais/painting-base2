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
const stringToNumber = (bin) => {
  let num = '';
  for (let i = 0; i < bin.length; i += 8) {
    let str = parseInt(bin.substring(0, 8)).toString(10);
    num += strFill(8-str.length) + str;
    bin = bin.substring(8, bin.length);
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
const moveToPercent = (percent, size) => {
  if (percent == 0) {
    return strFill(size*24, '0');
  } else if (percent == 1) {
    return strFill(size*24, '1');
  }
  let str = percent.toString(2);
  return str + strFill(size*24-str.length, '0');//generateRandomString(size*24 - str.length);
}

/* increment/decrement by a small number (< MAXINT) */
const incrementByNum = (num, str) => {
  if (num < 0) {
    return decrementByNum(-1*num, str);
  }
  return addBin(str, num.toString(2));
}
const decrementByNum = (num, str) => {
  return subBin(str, num.toString(2));
}

/* ------------------------------------------------------------- */
/* ------------------------------------------------------------- */

module.exports = {
  stringToCanvas: stringToCanvas,
  canvasToString: canvasToString,
  generateRandomString: generateRandomString,
  moveToPercent: moveToPercent,
  incrementByNum: incrementByNum
}

/* ------------------------------------------------------------- */
/* ------------------------------------------------------------- */

/* iterate over canvas and set each pixel as random */
// const generatePixels = (canvasData) => {
//   for (let i = 0; i < canvasData.length; i++) {
//     if (i%4 == 3) {
//       canvasData[i] = 255;
//     } else {
//       canvasData[i] = Math.floor(Math.random() * 256);
//     }
//   }
// }
// const stringToCanvas = (binStr, canvasData) => {
// //increment like binary
// let strPos = 0
// let imgPos = 0
// //const printTill = 5
// while (strPos < binStr.length && imgPos < canvasData.length) {
//   //let twoFiveSix = parseInt(binStr.substr(strPos, strPos+8), 2)
//   if (imgPos % 4 == 3) {
//     canvasData[imgPos] = 255
//   }
//   else {
//     let num = 0
//     for (var i =  strPos; i < strPos + 8; ++i) {
//       let bit = binStr[i] === '1' ? 1 : 0
//       num = num + bit
//       num = num * 2
//     }
//     const twoFiveSix = num
//     //const twoFiveSix = 100
//     canvasData[imgPos] = twoFiveSix
//     //if (imgPos < printTill) {
//     //console.log('pos:', imgPos, 'inserting:',twoFiveSix)
//     //}
//     strPos += 8
//   }
//   imgPos ++
// }
// }
// const getRandomByte = () => {
//   return Math.floor(Math.random() * 2) === 1 ? '1' : '0'
// }
// const generateString = (width, height) => {
//   const size = width * height * 8 * 256
//   var str = ''
//   for (let i = 0; i < size; ++i) {
//     str += (getRandomByte())
//   }
//   return str
// }
//=======
//const binBoolToInt = (str) => {
//let num = 0
//for (var i = 0; i<str.length; i++) {
//num = num + parseInt(str[i])
//num = num * 2
//}
//return num / 2
//}
//const getRandomByte = () => {
//return Math.floor(Math.random() * 2) === 1 ? true : false
//}
//const getRandomByteArray = (N) => {
//var arr = new Array(N)
//for (var i=0; i<N; i++) {
//arr[i] = getRandomByte()
////arr.push(getRandomByte())
//}
//return arr
////return Array.apply(null, {length: N}).map(Function.call, getRandomByte)
////return Array.apply(null, {length: N}).map(1)
//}
//console.log('str:', strPos, 'img:', imgPos)
//for (var i=0; i < canvasData.data.length; i+= 4 ) {
//canvasData.data[i] = Math.floor(Math.random() * 256)
//canvasData.data[i+1] = Math.floor(Math.random() * 256)
//canvasData.data[i+2] = Math.floor(Math.random() * 256)
//canvasData.data[i+3] = 255
//}
//return canvasData
//}
//module.exports = {
//randomByteArray: getRandomByteArray,
//generatePixels: generatePixels
//>>>>>>> master
//}
