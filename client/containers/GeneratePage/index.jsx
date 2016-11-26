/*
 * generation page, houses canvas and slider widget
 */

import React from 'react'
import {connect} from 'react-redux'

import {setImageData } from '~/containers/App/actions'
import Canvas from '~/components/Canvas/index.jsx'
import Increment from '~/components/Increment/index.jsx'


const Generate = (props) => {
  //const width = props.width
  //const height = props.height
  //const canvasData = props.canvasData
  //const shouldRenderCanvas = props.shouldRenderCanvas

  const { width, height, canvasData, shouldRenderCanvas } = props

  console.log('should render:', shouldRenderCanvas)
  return (
    <div>
      <Canvas
        width={width}
        height={height}
        percent={props.percent}
        percentChanged={props.percentChanged}
        doneChangingPercent={props.doneChangingPercent}
        binStr={props.binStr}
        canvasData={canvasData}
        shouldUpdate={shouldRenderCanvas}
        initImageData={props.setImageData}
        doneUpdating={props.tellCanvasToStopUpdating}/>
      <Increment
        percentage={props.percent}
        incrementByPercent={props.incImageDataByPercent}
        incrementByNumber={props.incImageDataByNumber}
      />
    </div>
  )
}

export default Generate
