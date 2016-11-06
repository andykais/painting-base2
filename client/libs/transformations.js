const binBoolToInt = (str) => {
  let num = 0
  for (var i = 0; i<str.length; i++) {
    num = num + parseInt(str[i])
    num = num * 2
  }
  return num / 2

}

const getRandomByte = () => {
  return Math.floor(Math.random() * 2) === 1 ? true : false
}
const getRandomByteArray = (N) => {
  var arr = new Array(N)
  for (var i=0; i<N; i++) {
    arr[i] = getRandomByte()
    //arr.push(getRandomByte())
  }
  return arr
  //return Array.apply(null, {length: N}).map(Function.call, getRandomByte)
  //return Array.apply(null, {length: N}).map(1)
}

let generatePixels = (binArr, canvasData) => {
  //increment like binary
  let strPos = 0
  let imgPos = 0

  const printTill = 5
  while (strPos < binArr.length && imgPos < canvasData.length) {

    //let twoFiveSix = parseInt(binStr.substr(strPos, strPos+8), 2)

    if (imgPos % 4 == 0) {
      canvasData[imgPos] = 255
    }
    else {
      let num = 0
      for (var i =  strPos; i < strPos + 8; ++i) {
        let bit = binArr[i] === true ? 1 : 0
        num = num + bit
        num = num * 2
      }
      const twoFiveSix = num
      canvasData[imgPos] = twoFiveSix
      //if (imgPos < printTill) {
      //console.log('pos:', imgPos, 'inserting:',twoFiveSix)
      //}
      strPos += 8

    }
    imgPos ++
  }
  //console.log('str:', strPos, 'img:', imgPos)
  //for (var i=0; i < canvasData.data.length; i+= 4 ) {
  //canvasData.data[i] = Math.floor(Math.random() * 256)
  //canvasData.data[i+1] = Math.floor(Math.random() * 256)
  //canvasData.data[i+2] = Math.floor(Math.random() * 256)
  //canvasData.data[i+3] = 255
  //}
  //return canvasData
}


module.exports = {
  randomByteArray: getRandomByteArray,
  generatePixels: generatePixels
}
