import React from 'react'
import { Link } from 'react-router'

import './styles.scss'

const NavLink = (props) => (
  <Link {...props} activeClassName='activeStyle'/>
)

export default NavLink
