/*
 * upload component, will contain image upload form
 */

import React from 'react'
import {browserHistory} from 'react-router'

let convertToBlackOrWhite = (imgArray) => {
  var i = 0
  while (i < imgArray.length) {
    // ( R + G + B ) / 2
    var avg = 0.299*imgArray[i] + 0.587*imgArray[i+1] + 0.114*imgArray[i+2]
    //var avg = ( imgArray[i] + imgArray[i+1] + imgArray[i+2] ) / 3
    var bOw = avg >= 128 ? 255 : 0
    imgArray[i] = bOw
    imgArray[i+1] = bOw
    imgArray[i+2] = bOw
    i = i + 4
  }
}

const Upload = (props) => {

  /**
    Handle submit of an image on to the canvas
    This will update the canvas view
    */
  let handleImageChange = (e) => {
    e.preventDefault();
    let state = {}
    let reader = new FileReader();
    let file = e.target.files[0];
    //event listener for when file is downloaded
    reader.onloadend = () => {
      state.file = file;
      state.imagePreviewUrl = reader.result;
      //When the image is loaded it will be placed on the canvas
      var image = new Image();
      image.onload = function() {
        //need to resize canvas to minimum dimensions
        var canvas = document.createElement('canvas');
        let ctx = canvas.getContext("2d");
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
        let canvasData = ctx.getImageData(0,0,image.width, image.height);

        convertToBlackOrWhite(canvasData.data)
        props.setImageData(canvasData);
        browserHistory.push('/generate');
      };
      image.src = state.imagePreviewUrl;
    }

    reader.readAsDataURL(file);
  }

  return (
    <div className="previewComponent">
      <form onSubmit={(e)=>this._handleSubmit(e)}>
        <input className="fileInput" type="file" onChange={(e)=>handleImageChange(e)} />
      </form>
    </div>
  )

}

export default Upload
