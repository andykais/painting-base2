/*
 * reducer used for application variables
 * updates state upon action triggers
 */


import { fromJS } from 'immutable'

import { incrementByPercent, blankOutCanvas } from '~/libs/transformations'
import {
  CHANGE_SIZE,
    CHANGE_PERCENT,
    PERCENT_CHANGED,
    SET_CANVAS_DATA,
    INC_IMG_BY_PERCENT,
    INC_IMG_BY_NUMBER,
    SET_SHOULD_RENDER_TO_FALSE,
} from './constants'

const initialState = fromJS({
  width: 100, // canvas width
  height: 100, // canvas height
  percent: 0.50, // default percent for widget
  binStr: '', // binary string representing image
  canvasData: {}, // image pixel values that really are image
  shouldRenderCanvas: true,
  percentChanged: false // boolean to tell canvas when to update
})

let appReducer = (state = initialState, action) => {
  const oldState = state.toJS()
  let canvasData
  switch(action.type) {
    case SET_SHOULD_RENDER_TO_FALSE:
      console.log('setting render to false')
      return fromJS({
        ...oldState,
        shouldRenderCanvas: false
      })
    case SET_CANVAS_DATA:
      return fromJS({
        ...oldState,
        canvasData: action.canvasData,
        shouldRenderCanvas: true,
      })
    case INC_IMG_BY_PERCENT:
      canvasData = oldState.canvasData
      //console.log('before:', canvasData.data[0])
      //blankOutCanvas(canvasData.data)
      incrementByPercent(canvasData.data, action.percent)
      //console.log('after:', canvasData.data[0])
      return fromJS({
        ...oldState,
        canvasData: canvasData,
        shouldRenderCanvas: true,
      })
    case INC_IMG_BY_NUMBER:
      canvasData = oldState.canvasData
      return fromJS({
        ...oldState,
        canvasData: canvasData,
        shouldRenderCanvas: true,
      })

    case CHANGE_PERCENT:
      return fromJS({
        ...oldState,
        percentChanged: true,
        percent: action.percent
      })
    case PERCENT_CHANGED:
      return fromJS({
        ...oldState,
        percentChanged: false,
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


