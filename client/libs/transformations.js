const stringToCanvas = (binStr, canvasData) => {
  //increment like binary
  let strPos = 0
  let imgPos = 0


  //const printTill = 5
  while (strPos < binStr.length && imgPos < canvasData.length) {

    //let twoFiveSix = parseInt(binStr.substr(strPos, strPos+8), 2)

    if (imgPos % 4 == 3) {
      canvasData[imgPos] = 255
    }
    else {
      let num = 0
      for (var i =  strPos; i < strPos + 8; ++i) {
        let bit = binStr[i] === '1' ? 1 : 0
        num = num + bit
        num = num * 2
      }
      const twoFiveSix = num
      //const twoFiveSix = 100
      canvasData[imgPos] = twoFiveSix
      //if (imgPos < printTill) {
      //console.log('pos:', imgPos, 'inserting:',twoFiveSix)
      //}
      strPos += 8

    }
    imgPos ++
  }
}
const getRandomByte = () => {
  return Math.floor(Math.random() * 2) === 1 ? '1' : '0'
}
const generateString = (width, height) => {
  const size = width * height * 8 * 256
  var str = ''
  for (let i = 0; i < size; ++i) {
    str += (getRandomByte())
  }
  return str
}

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


/* convert float n to binary string */
const binFloat = (n) => {
  let s = '';
  while (s.length < 24) {
    n *= 2;
    if (n >= 1) {
      s += '1';
      n -= 1;
    }
    else {
      s += '0';
    }
  }
  return s;
}

/* convert percent to binary increment string */
const percentToString = (percent, size) => {
  return strFill(Math.ceil(size), binFloat(percent));
}

/* for large increments, use percentage to create increment value */
const incrementByPercent = (canvasData, percent) => {
  let str = percentToString(percent, canvasData.length*3/4);

  for (let k = 0; k < canvasData.length; k += 4) {
    incrementByNum(canvasData, parseInt(str.substring(str.length-24, str.length), 2), k);
    str = str.substring(0, str.length-24);
    if (str == '') {
      break;
    }
  }
}


module.exports = {
  generateString: generateString,
  percentToString: percentToString,
  stringToCanvas: stringToCanvas,
  generatePixels: generatePixels,
  incrementByNum: incrementByNum,
  incrementByPercent: incrementByPercent
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
}
