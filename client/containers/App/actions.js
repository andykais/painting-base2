/* 
 * main App actions
 * each action is sent to the reducer to update the state
 */

import {
  CHANGE_SIZE,
  CHANGE_PERCENT,
  PERCENT_CHANGED,
  CHANGE_STRING,
} from './constants'

export function generateRandom() {
  return {
    type: CHANGE_STRING,
  }
}

export function changeSide(sideLength) {
  return {
    type: CHANGE_SIZE,
    side: sideLength
  }
}

export function changePercent(percent) {
  return {
    type: CHANGE_PERCENT,
    percent: percent
  }
}

export function doneChangingPercent(percent) {
  return {
    type: PERCENT_CHANGED,
  }
}
