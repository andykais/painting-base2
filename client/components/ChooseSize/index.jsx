  /* 
   * size component
   * changes width and height for image
   */

import React from 'react'

const ChooseSize = (props) => {
  return (
    <div>
      <p>pick image size</p>
      <label htmlFor='width'>width</label>
      <input name='width' type='number' value={props.width} onChange={
        (e) => props.onChange({
          width: parseInt(e.target.value)
        })
      }/>
      <label htmlFor='height'>height</label>
      <input name='height' type='number' value={props.height} onChange={
        (e) => props.onChange({
          height: parseInt(e.target.value)
        })
      }/>
    <button onClick={() => props.generateRandom()}>
      {props.children}
    </button>
  </div>
  )
}

export default ChooseSize
