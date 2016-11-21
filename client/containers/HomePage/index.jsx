import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Upload from '~/components/Upload/index.jsx'
import ChooseSize from '~/components/ChooseSize/index.jsx'
import { changeSide } from './actions'
import selectHomePage from './selectors'

const HomePage = (props) => (
  <div>
    <ChooseSize
      width={props.width}
      height={props.height}
      onChange={(sideLength) => props.dispatch(changeSide(sideLength))}
    >
      <Link to={{
        pathname: 'generate',
          query: {
            width: props.width,
            height: props.height
          }
      }}>Generate Image</Link>
  </ChooseSize>
  <p> OR </p>
  <Upload/>
</div>
)

const mapStateToProps = selectHomePage();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
//export default connect(state => ({width: 23}))(HomePage);
