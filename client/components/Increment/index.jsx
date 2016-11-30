/*
 * component that contains slider widget
 * updates global percentage
 */

import React from 'react'
import './index.scss' // import styles

const min = 0
const max = 1000


const Increment = (props) => (
  <div>
    <label htmlFor="incPercent">increment image slider</label>
    <input name="incPercent" type="range" min={min} max={max} defaultValue={max*props.percent}
      onMouseUp={(e) => {
        props.incrementByPercent(e.target.value / max)
      }}
      onKeyUp={(e) => {
        props.incrementByPercent(e.target.value / max)
      }}
    />
    <div>
      <label htmlFor="incNumber">increment image button</label>
      <input name="incNumber" type="number" min={0} value={props.number}
        onChange={(e) => {
          props.updateIncrementNumber(e.target.value)
        }}
      />
      <button onClick={() => {
        props.incrementByNumber(props.number)
      }}>increment by value</button>
    </div>

  </div>
)

export default Increment
