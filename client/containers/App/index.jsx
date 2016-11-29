/*
 * main page for app
 * render navbar and all children for each page
 */

import React from 'react'
import { connect } from 'react-redux'

import Navbar from '~/components/Navbar/index.jsx'
import selectAppState from './selectors'
import {
    changeSide,
    setImageData,
    generateRandomCanvasData,
    incImageDataByPercent,
    incImageDataByNumber,
    tellCanvasToStopUpdating,
    changeIncrementNumber,
} from './actions'

const App = (props) => {

  const functionsForChildren = {
    changeSide: props.changeSide,
    changeIncrementNumber: props.changeIncrementNumber,
    tellCanvasToStopUpdating: props.tellCanvasToStopUpdating,
    setImageData: props.setImageData,
    generateRandomCanvasData: props.generateRandomCanvasData,
    incImageDataByPercent: props.incImageDataByPercent,
    incImageDataByNumber: props.incImageDataByNumber,
  }
  const variablesForChildren = {
    width: props.width,
    height: props.height,
    percent: props.percent,
    incrementNumber: props.incrementNumber,
    binStr: props.binStr,
    canvasData: props.canvasData,
    shouldRenderCanvas: props.shouldRenderCanvas,
  }

  /* functions and state variables sent through all containers to be available to various parts of application */
  const childrenWithProps = React.Children.map(props.children,
    (child) => React.cloneElement(child, {
      ...functionsForChildren,
      ...variablesForChildren
    })
  )

  return (
    <div id='app-container'>
      <Navbar generateRandomCanvasData={props.generateRandomCanvasData}/>
      <div className='app-content'>
        {childrenWithProps}
      </div>
      <footer></footer>
    </div>
  )

}

/* takes state variables in reducer, makes them available in this.props variable */
const mapStateToProps = selectAppState()

/* takes actions combined with props.dispatch (which sends action to reducer) */
function mapDispatchToProps(dispatch) {
  return {
    changeSide: (side) => dispatch(changeSide(side)),
    changeIncrementNumber: (number) => dispatch(changeIncrementNumber(number)),
    tellCanvasToStopUpdating: () => dispatch(tellCanvasToStopUpdating()),
    setImageData: (canvasData) => dispatch(setImageData(canvasData)),
    generateRandomCanvasData: () => dispatch(generateRandomCanvasData()),
    incImageDataByPercent: (percent) => dispatch(incImageDataByPercent(percent)),
    incImageDataByNumber: (number) => dispatch(incImageDataByNumber(number)),
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
