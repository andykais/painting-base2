import React from 'react'
import {connect} from 'react-redux'

import { setFirstResolution } from './actions'
import selectGeneratePage from './selectors'


const Generate = (props) => {
  const width = props.width
  const height = props.height

  return (
    <p> image generation goes here. Size {width * height} </p>
  )
}

const mapStateToProps = selectGeneratePage()

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Generate)
