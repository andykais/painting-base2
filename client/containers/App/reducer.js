/*
 * reducer used for application variables
 * updates state upon action triggers
 */

import { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'

import { moveToPercent, incrementByNumber, blankOutCanvas, generateRandomString, stringToCanvas, canvasToString } from '~/libs/transformations'
import {
  CHANGE_SIZE,
    SET_CANVASDATA,
    GENERATE_RANDOM_CANVASDATA,
    INC_IMG_BY_PERCENT,
    INC_IMG_BY_NUMBER,
    SET_SHOULD_RENDER_TO_TRUE,
    SET_SHOULD_RENDER_TO_FALSE,
} from './constants'

const initialState = fromJS({
  width: 100, // canvas width
  height: 100, // canvas height
  percent: 500, // default percent for widget
  binStr: '', // binary string representing image
  canvasData: {}, // image pixel values that really are image
  shouldRenderCanvas: false,
  percentChanged: false, // boolean to tell canvas when to update
  incrementNumber: 100
})

let appReducer = (state = initialState, action) => {
  const oldState = state.toJS()
  let canvasData
  let str
  switch(action.type) {
    case SET_SHOULD_RENDER_TO_TRUE:
      return fromJS({
        ...oldState,
        shouldRenderCanvas: true
      })
    case SET_SHOULD_RENDER_TO_FALSE:
      return fromJS({
        ...oldState,
        shouldRenderCanvas: false
      })
    case SET_CANVASDATA:
      return fromJS({
        ...oldState,
        canvasData: action.canvasData,
        width: action.canvasData.width,
        height: action.canvasData.height,
        shouldRenderCanvas: true,
      })
    case GENERATE_RANDOM_CANVASDATA:
      canvasData = oldState.canvasData
      var canvas = document.createElement('canvas')
      canvas.width = oldState.width
      canvas.height = oldState.height
      var ctx = canvas.getContext('2d')
      canvasData = ctx.createImageData(oldState.width, oldState.height)
      stringToCanvas(generateRandomString(canvasData.data.length*6), canvasData.data)
      return fromJS({
        ...oldState,
        canvasData: canvasData,
        shouldRenderCanvas: true
      })
    case INC_IMG_BY_PERCENT:
      canvasData = oldState.canvasData
        /* instead of passing canvasToString(canvasData.data)
         * it's best to keep an original image string
         * so decrementing can return the original image instead of random
         */
      str = moveToPercent(canvasToString(canvasData.data), action.percent)
      stringToCanvas(str, canvasData.data)
      return fromJS({
        ...oldState,
        canvasData: canvasData,
        shouldRenderCanvas: true,
      })
    case INC_IMG_BY_NUMBER:
      canvasData = oldState.canvasData
        /* instead of passing canvasToString(canvasData.data)
         * it's best to keep an original image string
         * so decrementing can return the original image instead of random
         */
      str = incrementByNumber(canvasToString(canvasData.data), parseInt(action.number))
      stringToCanvas(str, canvasData.data)
      return fromJS({
        ...oldState,
        canvasData: canvasData,
        shouldRenderCanvas: true,
      })
    case CHANGE_SIZE:
      return fromJS({
        ...oldState,
        ...action.side
      })
    default:
      return state
  }
}

export default appReducer
