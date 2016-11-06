import React from 'react';

import {generatePixels} from '../libs/transformations.js';

class Generate extends React.Component {

  constructor(props) {
    super(props);
    this.state = props.genInfo
  }
  componentDidMount() {
    this.updateCanvas()
  }
  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.genInfo)
    this.updateCanvas()
  }

  updateCanvas() {
    let ctx = this.refs.canvas.getContext('2d')
    let canvasData = ctx.getImageData(0, 0, this.state.width, this.state.height)
    //console.log('genArr.length', this.state.genArr.length)
    // affects internal state of canvasData.data array
    generatePixels(this.state.genArr, canvasData.data)

    //console.log('canvasData.data[1]', canvasData.data[1])
    //console.log(this.state.genArr)
    ctx.putImageData(canvasData, 0, 0)
  }


  render() {
    return (
      <canvas id='canvas' ref='canvas' width={this.state.width} height={this.state.height}></canvas>
    )
  }
}
export default Generate
