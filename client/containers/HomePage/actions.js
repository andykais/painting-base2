/*
 *
 * HomePage actions
 *
 */

import {
  CHANGE_SIZE,
  DEFAULT_ACTION
} from './constants'

export function changeSide(sideLength) {
  return {
    type: CHANGE_SIZE,
    side: sideLength
  }
}

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  }
}

