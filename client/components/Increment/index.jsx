/*
 * component that contains slider widget
 * updates global percentage
 */

import React from 'react'

const min = 0
const max = 1000

const Increment = (props) => (
  <div>
    <label htmlFor="increment">increment image</label>
    <input name="increment" type="range" min={min} max={max} value={props.percent}
      onChange={(e) => {
        props.incrementImage(e.target.value / max)
      }}
    />
  </div>
)

export default Increment
