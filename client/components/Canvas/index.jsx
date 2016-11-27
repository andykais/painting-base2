/*
 * component that contains canvas element that draws image
 * updates when slider percentage changes
 * updates if no percentage given (generate random image)
 */

import React from 'react'

import {stringToCanvas, canvasToString, generateRandomString, moveToPercent, incrementByNum} from '~/libs/transformations'

class Canvas extends React.Component {
  updateCanvas() {
    let ctx = this.canvas.getContext('2d')
    let canvasData = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)

    if (this.props.percentChanged) {
      let str = moveToPercent(this.props.percent, canvasData.data.length/4)
      stringToCanvas(str, canvasData.data)
      this.props.doneChangingPercent()
    } else if (false) {
      // ** increment/decrement by small number **
      // better efficienty -> keep a string representation of the canvas in props/state
      // give negative number for decrement

      // let str = incrementByNum(num, canvasToString(canvasData.data))
      // stringToCanvas(str, canvasData.data)
    } else {
      // let str = generateRandomString(canvasData.data.length*6)
      // stringToCanvas(str, canvasData.data)
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
