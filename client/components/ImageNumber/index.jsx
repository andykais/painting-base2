/*
 * iage number component
 * options to display or download text file containing number
 */

import React from 'react'

import {canvasToString, stringToNumber} from '~/libs/transformations'

class ImageNumber extends React.Component {
  /* create integer string for image */
  getString(canvas) {
    let str = 'Please upload or generate an image'
    if (canvas) {
      let canvasData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height)
      str = stringToNumber(canvasToString(canvasData.data))//stringToNumber(canvasToString(canvasData.data))
    }
    return str
  }

  /* open download prompt to save string */
  downloadFile(str) {
    let a = document.createElement('a');
    a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(str));
    a.setAttribute('download', 'image-number.txt');

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  /* open new window displaying string */
  showFile(str) {
    window.open(URL.createObjectURL(new Blob([str], {type: 'text/plain'})))
  }

  /* create buttons to download or view number */
  render() {
    let canvas = document.getElementById('canvas')
    return (
      <div>
        <button
          onClick={() => this.downloadFile(this.getString(canvas))}
        >
          Download your number
        </button>
        <button
          onClick={() => this.showFile(this.getString(canvas))}
        >
          See your number
        </button>
      </div>
    )
  }
}

export default ImageNumber
