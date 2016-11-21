import React from 'react'
import { Link } from 'react-router'
//import { changeSide } from '~/containers/HomePage/actions'

const ChooseSize = (props) => {
  return (
    <div>
      <p> size </p>
      <label htmlFor='width'></label>
      <input name='width' type='number' value={props.width} onChange={
        (e) => props.onChange({
          width: parseInt(e.target.value)
        })
      }/>
      <label htmlFor='height'></label>
      <input name='height' type='number' value={props.height} onChange={
        (e) => props.onChange({
          height: parseInt(e.target.value)
        })
      }/>
    <button>
      {props.children}
    </button>
  </div>
  )
}

export default ChooseSize

