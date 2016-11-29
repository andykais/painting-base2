/*
 * reducer used for application variables
 * updates state upon action triggers
 */


import { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'

import { incrementByPercent, incrementByNumber, blankOutCanvas, generatePixels } from '~/libs/transformations'
import {
  CHANGE_SIZE,
    SET_CANVASDATA,
    GENERATE_RANDOM_CANVASDATA,
    INC_IMG_BY_PERCENT,
    INC_IMG_BY_NUMBER,
    SET_SHOULD_RENDER_TO_FALSE,
    CHANGE_INCREMENT_NUMBER,
} from './constants'



const initialState = fromJS({
  width: 100, // canvas width
  height: 100, // canvas height
  percent: 0.50, // default percent for widget
  binStr: '', // binary string representing image
  canvasData: {}, // image pixel values that really are image
  shouldRenderCanvas: false,
  percentChanged: false, // boolean to tell canvas when to update
  incrementNumber: 100
})


let appReducer = (state = initialState, action) => {
  const oldState = state.toJS()
  let canvasData
  switch(action.type) {
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
      if (oldState.width !== canvasData.width || oldState.height !== canvasData.height) {
        var canvas = document.createElement('canvas')
        canvas.width = oldState.width
        canvas.height = oldState.height
        var ctx = canvas.getContext('2d')
        canvasData = ctx.createImageData(oldState.width, oldState.height)
        generatePixels(canvasData.data)
      }
      return fromJS({
        ...oldState,
        canvasData: canvasData,
        shouldRenderCanvas: true
      })
    case INC_IMG_BY_PERCENT:
      canvasData = oldState.canvasData
      //blankOutCanvas(canvasData.data)
      incrementByPercent(canvasData.data, action.percent)
      return fromJS({
        ...oldState,
        canvasData: canvasData,
        shouldRenderCanvas: true,
      })
    case INC_IMG_BY_NUMBER:
      canvasData = oldState.canvasData
      incrementByNumber(canvasData.data, action.number, 0)
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
