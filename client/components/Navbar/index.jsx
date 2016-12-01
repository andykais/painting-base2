/*
 * navbar component, contains links to other pages
 */

import React from 'react'
import {Link} from 'react-router'
import './index.scss' // import styles

import ImageNumber from '~/components/ImageNumber/index.jsx'

const Navbar = (props) => (
  <header>
    <ul>
      <li><Link to='/'>Home</Link></li>
      <li><ImageNumber canvasData={props.canvasData}/></li>
      <li><Link to='/about'>About</Link></li>
      <li><Link
          to='/generate'
          onClick={props.tellCanvasToUpdate}>
          Image
      </Link></li>


    </ul>
  </header>
)

export default Navbar
