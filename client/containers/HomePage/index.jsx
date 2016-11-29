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
      generateRandom={props.generateRandomCanvasData}
    />
    <p> OR </p>
    <Upload setImageData={props.setImageData}/>
  </div>
)


export default HomePage
