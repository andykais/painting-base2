import React from 'react';
import { Link } from 'react-router';

/**
  Helper fucntion to change hex string to integer
  @param hex: string
  @return number
*/
function hexToInt(hex) {
  return parseInt(hex, 16);
}

class colorBlock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {color: props.color }
  }

  /**
    Fucntion to run after document has loaded for initial color
  */
  componentDidMount() {
    let c=document.getElementById("pixelCanvas");
    let ctx=c.getContext("2d");
    ctx.fillStyle='#'+this.state.color.toString(16);
    ctx.fillRect(0,0,300,150);
  }

  /**
    Handle submit of request to change color
    This will update the states color
  */
  _handleSubmit(e) {
    e.preventDefault();
    this.state.color=Math.floor(Math.random()*16777215);
    let c=document.getElementById("pixelCanvas");
    let ctx=c.getContext("2d");
    ctx.fillStyle='#'+this.state.color.toString(16);
    ctx.fillRect(0,0,300,150);
    this.forceUpdate();
  }

  /**
  Render Function to Display HTML of component
  */
  render() {
    return (
      <div className="colorBlock">
          <canvas id="pixelCanvas" width="300" height="150">Your browser does not support the HTML5 canvas tag.</canvas>
          <button className="submitButton" type="submit" onClick={(e)=>this._handleSubmit(e)}>Randomize Color</button>
          <p>This color is, {this.state.color}</p>
      </div>
    );
  }
}

export default colorBlock
