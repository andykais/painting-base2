/*
 * component that contains canvas element that draws image
 * updates when slider percentage changes
 * updates if no percentage given (generate random image)
 */

import React from 'react'

import './styles.scss'

let shouldGenerate = (canvasData, width, height) => {
  if (!canvasData.data) return true
  if (canvasData.data.length != width * height * 4) return true
  return false
}

class Canvas extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      width: this.props.width,
      zoom: 1
    }
  }
  applyZoom(percentZoom) {
    let newWidth = this.state.width * percentZoom
    this.setState({ width: newWidth })
    this.canvas.style.cssText = `width: ${newWidth}px`
  }
  /* update canvas by generating random image or incrementing image */
  updateCanvas() {
    let width = this.canvas.width
    let height = this.canvas.height

    let ctx = this.canvas.getContext('2d')
    let canvasData = this.props.canvasData
    if (!canvasData.data) {
      this.props.initImageData()
      return
    }
    /* helper variables tell canvas when to update, because redux does not recognize changes in array */
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

  /* create canvas element to render */
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
          id='canvas'
        ></canvas>
        <div>
          <button
            onClick={() => this.applyZoom(2)}>
            +
          </button>
          <button
            onClick={() => this.applyZoom(0.5)}>
            -
          </button>
        </div>
      </div>
    )
  }
}

export default Canvas
