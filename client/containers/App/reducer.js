/*
 * reducer used for application variables
 * updates state upon action triggers
 */

import { fromJS } from 'immutable'

import { generateString, percentToString } from '~/libs/transformations'
import {
  CHANGE_SIZE,
    CHANGE_STRING,
    CHANGE_PERCENT,
    PERCENT_CHANGED,
} from './constants'

const initialState = fromJS({
  width: 100, /* canvas width */
  height: 100, /* canvas height */
  percent: 0.50, /* default percent for widget */
  binStr: '', /* binary string representing image */
  canvasData: [], /* image pixel values that really are image */
  percentChanged: false /* boolean to tell canvas when to update */
})

let generatePageReducer = (state = initialState, action) => {
  const oldState = state.toJS()
  switch(action.type) {
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
      const side = action.side
      return fromJS({
        ...oldState,
        ...side
      })
    default:
      return state
  }
}

export default generatePageReducer
