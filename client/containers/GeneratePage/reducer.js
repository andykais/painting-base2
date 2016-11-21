/*
 *
 * GeneratePage reducer
 *
 */

import { fromJS } from 'immutable'
import {
  DEFAULT_ACTION
} from './constants'

const initialState = fromJS({
  width: -1,
  height: -1
})

let generatePageReducer = (state = initialState, action) => {
  let oldState = state.toJS()
  switch(action.type) {
    default:
      return state
  }
}


export default generatePageReducer

