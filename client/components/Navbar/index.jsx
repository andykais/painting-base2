/*
 * navbar component, contains links to other pages
 */

import React from 'react'
import {Link} from 'react-router'
import './index.scss' // import styles

const Navbar = (props) => (
  <header>
    <ul>
      <li><Link to='/'>Home</Link></li>
      <li><Link
          to='/generate'
          onClick={props.tellCanvasToUpdate}>
          Number
      </Link></li>
      <li><Link to='/about'>About</Link></li>
      <li><Link
          to='/generate'
          onClick={props.tellCanvasToUpdate}>
          Generate
      </Link></li>


    </ul>
  </header>
)

export default Navbar
