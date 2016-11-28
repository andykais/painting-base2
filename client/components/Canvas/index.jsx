/*
 * component that contains canvas element that draws image
 * updates when slider percentage changes
 * updates if no percentage given (generate random image)
 */

import React from 'react'

import {stringToCanvas, generatePixels, incrementByPercent} from '~/libs/transformations'

class Canvas extends React.Component {
  updateCanvas() {
    let ctx = this.canvas.getContext('2d')
    let canvasData = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)

    if (this.props.percentChanged) {

      incrementByPercent(canvasData.data, this.props.percent)
      this.props.doneChangingPercent()
    } else {
      generatePixels(canvasData.data)
    }
    ctx.putImageData(canvasData, 0, 0)
  }
  componentDidMount() {
    this.updateCanvas()
  }
  componentDidUpdate() {
    this.updateCanvas()
  }

  render() {
    return (
      <div>
        <canvas
          id={this.props.canvasID}
          width={this.props.width}
          height={this.props.height}
          ref={(c) =>
            this.canvas = c
          }
        ></canvas>
      </div>
    )
  }
}

export default Canvas
