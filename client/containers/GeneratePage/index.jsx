/*
 * generation page, houses canvas and slider widget
 */

import React from 'react'
import {connect} from 'react-redux'

import Canvas from '~/components/Canvas/index.jsx'
import Increment from '~/components/Increment/index.jsx'
import Upload from '~/components/Upload/index.jsx'


const Generate = (props) => {
  const width = props.width;
  const height = props.height;
  const canvasID = 'generateCanvas';

  return (
    <div>
      <Canvas
        canvasID={canvasID}
        width={width}
        height={height}
        percent={props.percent}
        percentChanged={props.percentChanged}
        doneChangingPercent={props.doneChangingPercent}
        binStr={props.binStr}/>
      <Increment
        percentage={props.percent}
        incrementImage={props.changePercentage}
      />
      <Upload
        canvasID={canvasID}
      />
    </div>
  )
}

export default Generate
