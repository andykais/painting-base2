/*
 * generation page, houses canvas and slider widget
 */

import React from 'react'
import {connect} from 'react-redux'

import Canvas from '~/components/Canvas/index.jsx'
import Increment from '~/components/Increment/index.jsx'


const Generate = (props) => {
  const width = props.width
  const height = props.height

  return (
    <div>
      <Canvas
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
    </div>
  )
}

export default Generate
