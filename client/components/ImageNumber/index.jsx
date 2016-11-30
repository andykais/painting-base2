/*
 * image number component
 * options to display or download text file containing number
 */

import React from 'react'
import { Link } from 'react-router'

import {canvasToString, stringToNumber} from '~/libs/transformations'


const ImageNumber = (props) => {

  let getStringNumber = () => {
    let strMessage = props.canvasData.data
      ? stringToNumber(canvasToString(props.canvasData.data))
      : 'Please upload or generate an image'

    let url = URL.createObjectURL(new Blob([strMessage], {type: 'text/plain'}))
    return url
  }

  return (
    <a onClick={() => window.open(getStringNumber())}>Number</a>
  )
}

export default ImageNumber
