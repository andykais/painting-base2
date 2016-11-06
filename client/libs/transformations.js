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

export default generatePixels
