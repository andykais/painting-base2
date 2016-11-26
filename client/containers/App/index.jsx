import React from 'react'
import { connect } from 'react-redux'

import Navbar from '~/components/Navbar/index.jsx'
import { selectAppState } from './selectors'
import {
  generateRandom,
    changeSide,
    changePercent,
    doneChangingPercent,
    setImageData,
    incImageDataByPercent,
    incImageDataByNumber,
    tellCanvasToStopUpdating,
} from './actions'

const App = (props) => {
  const functionsForChildren = {
    changeSide: props.changeSide,
    changePercentage: props.changePercentage,
    doneChangingPercent: props.doneChangingPercent,
    percentChanged: props.percentChanged,
    generateRandom: props.generateRandom,
    tellCanvasToStopUpdating: props.tellCanvasToStopUpdating,
    setImageData: props.setImageData,
    incImageDataByPercent: props.incImageDataByPercent,
    incImageDataByNumber: props.incImageDataByNumber,
  }
  const variablesForChildren = {
    width: props.width,
    height: props.height,
    percent: props.percent,
    binStr: props.binStr,
    canvasData: props.canvasData,
    shouldRenderCanvas: props.shouldRenderCanvas,
  }

  // functions and state variables sent through all containers
  // to be available to various parts of application
  const childrenWithProps = React.Children.map(props.children,
    (child) => React.cloneElement(child, {
      ...functionsForChildren,
      ...variablesForChildren
    })
  )

  return (
    <div id='app-container'>
      <Navbar/>
      <div className='app-content'>
        {childrenWithProps}
      </div>
      <footer></footer>
    </div>
  )

}


// takes state variables in reducer, makes them available in this.props variable
const mapStateToProps = selectAppState()

// takes actions combined with props.dispatch (which sends action to reducer)
// unnecessary but simplifies the call within App
function mapDispatchToProps(dispatch) {
  return {
    changeSide: (side) => dispatch(changeSide(side)),
    changePercentage: (num) => dispatch(changePercent(num)),
    doneChangingPercent: () => dispatch(doneChangingPercent()),
    generateRandom: () => dispatch(generateRandom()),
    tellCanvasToStopUpdating: () => dispatch(tellCanvasToStopUpdating()),
    setImageData: (canvasData) => dispatch(setImageData(canvasData)),
    incImageDataByPercent: (percent) => dispatch(incImageDataByPercent(percent)),
    incImageDataByNumber: (number) => dispatch(incImageDataByNumber(number)),
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
