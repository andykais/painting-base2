import { combineReducers } from 'redux-immutable'

import canvasDataReducer from './canvasReducer'
import inputReducer from './inputReducer'

export default combineReducers({
  canvasDataReducer,
  inputReducer
})
