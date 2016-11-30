/*
 * navbar component, contains links to other pages
 */

import React from 'react'
import {Link} from 'react-router'

import ImageNumber from '~/components/ImageNumber/index.jsx'
import NavLink from '~/components/NavLink/index.jsx'
import './styles.scss' // import styles

const Navbar = (props) => (
  <header>
    <ul>
      <li><NavLink to='/'>Home</NavLink></li>
      <li><NavLink to='/about'>About</NavLink></li>
      <div className='pushRight'>
        <li><NavLink
            to='/generate'
            onClick={props.tellCanvasToUpdate}>
            Image
        </NavLink></li>
        <li><ImageNumber
            canvasData={props.canvasData}
            updateNumber={props.shouldRenderCanvas}/>
        </li>
      </div>
    </ul>
  </header>
)

export default Navbar
