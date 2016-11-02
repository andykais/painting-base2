import React from 'react';

class ImageUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state = {file: '', imagePreviewUrl: ''};
  }

  _handleSubmit(e) {
    e.preventDefault();
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    reader.onload = function(event) {
      var img = new Image();
      img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
      }
      img.src = event.target.result;
    }

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file);
  }

  render() {
    let {imagePreviewUrl} = this.state;

    return (
      <div className="previewComponent">
        <form onSubmit={(e)=>this._handleSubmit(e)}>
          <input className="fileInput" type="file" onChange={(e)=>this._handleImageChange(e)} />
          <button className="submitButton" type="submit" onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
        </form>
      </div>
    )
  }
}

export default ImageUpload
