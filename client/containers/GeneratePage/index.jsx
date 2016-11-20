import React from 'react'

const Generate = ({location: { query }}) => ( 
  <p> image generation goes here. Size {query.width * query.height} </p>
 )

Generate.propTypes = {}

export default Generate
