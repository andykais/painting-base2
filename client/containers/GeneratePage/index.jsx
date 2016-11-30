/*
 * generation page, houses canvas and slider widget
 */

import React from 'react'
import {connect} from 'react-redux'

import Canvas from '~/components/Canvas/index.jsx'
import Increment from '~/components/Increment/index.jsx'
import ImageNumber from '~/components/ImageNumber/index.jsx'
import Upload from '~/components/Upload/index.jsx'

const Generate = (props) => {

  // store values from App
  const { width, height, canvasData, shouldRenderCanvas, incrementNumber } = props

  return (
    <div>
      <Canvas
        width={width}
        height={height}
        canvasData={canvasData}
        shouldUpdate={shouldRenderCanvas}
        initImageData={props.generateRandomCanvasData}
        doneUpdating={props.tellCanvasToStopUpdating}
      />
      <Increment
        percent={props.percent}
        number={incrementNumber}
        incrementByPercent={props.incImageDataByPercent}
        incrementByNumber={props.incImageDataByNumber}
      />
    </div>
  )
}

export default Generate
