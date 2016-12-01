/*
 * size component
 * changes width and height for image
 */

import React from 'react'
import { Link } from 'react-router'

import { numberToString } from '~/libs/transformations'

import './styles.scss' // import styles

const ChooseSize = (props) => {
  return (
    <div>
      <p>Choose an Image Size</p>
      <label htmlFor='width'>Width  
      <input name='width' type='number' value={props.width} onChange={
        (e) => props.onChange({
          width: parseInt(e.target.value)
        })
      }/>
      </label>
      <label htmlFor='height'>Height
      <input name='height' type='number' value={props.height} onChange={
        (e) => props.onChange({
          height: parseInt(e.target.value)
        })
      }/>
      </label>
      <Link to='generate'>
        <button onClick={() => props.generateRandom()}>
          Generate Image
        </button>
      </Link>
    </div>
  )
}

export default ChooseSize
