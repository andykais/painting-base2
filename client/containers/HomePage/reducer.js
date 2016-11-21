/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable'
import {
  CHANGE_SIZE,
    SUBMIT_SIZE,
    DEFAULT_ACTION
} from './constants'

const initialState = fromJS({
  width: 100,
  height: 100
})

let homePageReducer = (state = initialState, action) => {
  let oldState = state.toJS()
  switch(action.type) {
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


export default homePageReducer

