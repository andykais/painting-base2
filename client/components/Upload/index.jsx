/*
 * upload component, will contain image upload form
 */

import React from 'react'

class Upload extends React.Component {

  /**
    Handle submit of an image on to the canvas
    This will update the canvas view
  */
  _handleImageChange(e,canvasID) {
    e.preventDefault();
    let state = {}
    let reader = new FileReader();
    let file = e.target.files[0];
    //event listener for when file is downloaded
    console.log(canvasID);
    reader.onloadend = () => {
      state.file = file;
      state.imagePreviewUrl = reader.result;
      let canvas = document.getElementById(canvasID);
      let ctx = canvas.getContext("2d");
      //When the image is loaded it will be placed on the canvas
      var image = new Image();
      image.onload = function() {
          //need to resize canvas to minimum dimensions
          canvas.width = image.width;
          canvas.height = image.height;
          ctx.drawImage(image, 0, 0);
      };
      image.src = state.imagePreviewUrl;
    }

    reader.readAsDataURL(file);
  }

  /**
    Render Function to Display HTML of component
  */
  render() {
    return (
      <div className="previewComponent">
            <form onSubmit={(e)=>this._handleSubmit(e)}>
              <input className="fileInput" type="file" onChange={(e)=>this._handleImageChange(e,this.props.canvasID)} />
            </form>
      </div>
    )
  }

}

export default Upload
