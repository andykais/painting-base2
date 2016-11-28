/*
 * upload component, will contain image upload form
 */

import React from 'react'

class Upload extends React.Component {

  _handleImageChange(e) {
    e.preventDefault();
    let state = {}
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      state.file = file;
      state.imagePreviewUrl = reader.result;
      var canvas = document.getElementById("generateCanvas");
      var ctx = canvas.getContext("2d");

      var image = new Image();
      image.onload = function() {
          canvas.width = image.width;
          canvas.height = image.height;
          ctx.drawImage(image, 0, 0);
      };
      image.src = state.imagePreviewUrl;
    }

    reader.readAsDataURL(file);
  }

  render() {
    return (
      <div className="previewComponent">
            <form onSubmit={(e)=>this._handleSubmit(e)}>
              <input className="fileInput" type="file" onChange={(e)=>this._handleImageChange(e)} />
            </form>
      </div>
    )
  }

}


export default Upload
