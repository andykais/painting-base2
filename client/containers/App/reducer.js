/*
 * reducer used for application variables
 * updates state upon action triggers
 */

import { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'

import {
  moveToPercent,
  incrementByNumber,
  blankOutCanvas,
  generateRandomString,
  stringToCanvas,
  canvasToString,
  getPercent
} from '~/libs/transformations'

import {
  CHANGE_SIZE,
    SET_CANVASDATA,
    GENERATE_RANDOM_CANVASDATA,
    INC_IMG_BY_PERCENT,
    INC_IMG_BY_NUMBER,
    SET_SHOULD_RENDER_TO_FALSE,
    CHANGE_INCREMENT_NUMBER
} from './constants'

const initialState = fromJS({
  width: 100, // canvas width
  height: 100, // canvas height
  percent: 0.5, // default percent for widget
  binStr: '', // binary string representing image
  canvasData: {}, // image pixel values that really are image
  shouldRenderCanvas: false,
  percentChanged: false, // boolean to tell canvas when to update
  incrementNumber: 100
})

let appReducer = (state = initialState, action) => {
  const oldState = state.toJS()
  let canvasData
  let str = ''
  switch(action.type) {
    case SET_SHOULD_RENDER_TO_FALSE:
      return fromJS({
        ...oldState,
        shouldRenderCanvas: false
      })
    case SET_CANVASDATA:
      canvasData = action.canvasData
      str = canvasToString(canvasData.data)
      return fromJS({
        ...oldState,
        canvasData: canvasData,
        width: canvasData.width,
        height: canvasData.height,
        binStr: str,
        percent: getPercent(str),
        shouldRenderCanvas: true,
      })
    case GENERATE_RANDOM_CANVASDATA:
      str = oldState.binStr
      canvasData = oldState.canvasData
      if (oldState.width !== canvasData.width || oldState.height !== canvasData.height) {
        var canvas = document.createElement('canvas')
        canvas.width = oldState.width
        canvas.height = oldState.height
        var ctx = canvas.getContext('2d')
        canvasData = ctx.createImageData(oldState.width, oldState.height)
        str = generateRandomString(canvasData.data.length*6)
        stringToCanvas(str, canvasData.data)
      }
      return fromJS({
        ...oldState,
        canvasData: canvasData,
        binStr: str,
        percent: getPercent(str),
        shouldRenderCanvas: true
      })
    case INC_IMG_BY_PERCENT:
      canvasData = oldState.canvasData
      str = moveToPercent(oldState.binStr, action.percent)
      stringToCanvas(str, canvasData.data)
      return fromJS({
        ...oldState,
        canvasData: canvasData,
        percent: getPercent(str),
        shouldRenderCanvas: true,
      })
    case INC_IMG_BY_NUMBER:
      canvasData = oldState.canvasData
      str = incrementByNumber(canvasToString(canvasData.data), parseInt(action.number))
      stringToCanvas(str, canvasData.data)
      return fromJS({
        ...oldState,
        canvasData: canvasData,
        percent: getPercent(str),
        shouldRenderCanvas: true,
      })
    case CHANGE_SIZE:
      return fromJS({
        ...oldState,
        ...action.side
      })
    case CHANGE_INCREMENT_NUMBER:
      return fromJS({
        ...oldState,
        incrementNumber: action.number
      })
    default:
      return state
  }
}

export default appReducer
