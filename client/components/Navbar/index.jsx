/*
 * navbar component, contains links to other pages
 */

import React from 'react'
import {Link} from 'react-router'

const Navbar = () => (
  <header>
    <ul>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/generate'>Generate</Link></li>
      <li><Link to='/about'>About</Link></li>
    </ul>
  </header>
)

export default Navbar
