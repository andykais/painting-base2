/*
 * component that contains canvas element that draws image
 * updates when slider percentage changes
 * updates if no percentage given (generate random image)
 */

import React from 'react'

import {stringToCanvas, incrementByPercent} from '~/libs/transformations'

import './index.scss' // import styles

let shouldGenerate = (canvasData, width, height) => {
  if (!canvasData.data) return true
  if (canvasData.data.length != width * height * 4) return true
  return false
}

class Canvas extends React.Component {
  updateCanvas() {
    let width = this.canvas.width
    let height = this.canvas.height

    let ctx = this.canvas.getContext('2d')
    let canvasData = this.props.canvasData

    if (!canvasData.data) {
      this.props.initImageData()
    }
    // helper variables tell canvas when it should update itself
    // because redux does not regcognize changes in array
    if (this.props.shouldUpdate) {
      ctx.putImageData(canvasData, 0, 0)
      this.props.doneUpdating()
    }
  }

  componentDidMount() {
    this.updateCanvas()
  }
  componentDidUpdate() {
    this.updateCanvas()
  }
  componentWillDismount() {
    console.log('unmounting canvas')
  }

  render() {
    return (
      <div>
        <canvas
          id='canvas'
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
