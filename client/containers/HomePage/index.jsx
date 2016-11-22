/*
 * index page for application
 * houses size chooser and upload form
 * either one triggers generate page accordingly
 */

import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Upload from '~/components/Upload/index.jsx'
import ChooseSize from '~/components/ChooseSize/index.jsx'

const HomePage = (props) => (
  <div>
    <ChooseSize
      width={props.width}
      height={props.height}
      onChange={(sideLength) => props.changeSide(sideLength)}
      generateRandom={props.generateRandom}
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


export default HomePage
