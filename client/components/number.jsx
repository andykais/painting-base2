import React from 'react';

class Number extends React.Component {

  constructor(props) {
    super(props);
  }

  /* iterate over canvas and return file containing numerical representation */
  getNumberFile(canvasData) {
    let num = '';
    for (let i = 0; i < canvasData.length; i += 4) {
        num += (canvasData[i] + (canvasData[i+1] << 8) + (canvasData[i+2] << 16)).toString(10);
    }
    return new Blob([num], {type: 'text/plain'});
  }

  render() {
    /* get image data */
    let canvas = document.getElementById('canvas');
    let canvasData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;

    /* create file with image number */
	let file = this.getNumberFile(canvasData);

	/* redirect to number file */
    window.open(URL.createObjectURL(file));
    return(null);
  }
}

export default Number
