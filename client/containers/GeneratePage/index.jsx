/*
 * generation page, houses canvas and slider widget
 */

import React from 'react'
import {connect} from 'react-redux'

import Canvas from '~/components/Canvas/index.jsx'
import Increment from '~/components/Increment/index.jsx'


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
        doneUpdating={props.tellCanvasToStopUpdating}/>
      <Increment
        percentage={props.percent}
        number={incrementNumber}
        incrementByPercent={props.incImageDataByPercent}
        updateIncrementNumber={props.changeIncrementNumber}
        incrementByNumber={props.incImageDataByNumber}
      />
    </div>
  )
}

export default Generate
