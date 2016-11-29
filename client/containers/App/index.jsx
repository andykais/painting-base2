/*
 * main page for app
 * render navbar and all children for each page
 */

import React from 'react'
import { connect } from 'react-redux'

import Navbar from '~/components/Navbar/index.jsx'
import { selectAppState } from './selectors'
import { generateRandom, changeSide, changePercent, doneChangingPercent } from './actions'

const App = (props) => {
  const functionsForChildren = {
      changeSide: props.changeSide,
      changePercentage: props.changePercentage,
      doneChangingPercent: props.doneChangingPercent,
      percentChanged: props.percentChanged,
      generateRandom: props.generateRandom,
  }
  const variablesForChildren = {
      width: props.width,
      height: props.height,
      percent: props.percent,
      binStr: props.binStr
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
      <Navbar/>
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
    changePercentage: (num) => dispatch(changePercent(num)),
    doneChangingPercent: () => dispatch(doneChangingPercent()),
    generateRandom: () => dispatch(generateRandom()),
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
