import React from 'react'
import { connect } from 'react-redux';

import Upload from '~/components/Upload/index.jsx'
import ChooseSize from '~/components/ChooseSize/index.jsx'
import { changeSide } from './actions'
import selectHomePage from './selectors'

const App = (props) => {
  let handleSubmit = (e) => {
    console.log('submit')
  }

  return (
    <div>
      <ChooseSize
        width={props.width}
        height={props.height}
        onChange={(sideLength) => props.dispatch(changeSide(sideLength))}
      />
      <p> OR </p>
      <Upload/>
    </div>
  )
}

const mapStateToProps = selectHomePage();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
