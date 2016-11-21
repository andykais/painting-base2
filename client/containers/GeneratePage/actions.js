/*
 *
 * HomePage actions
 *
 */

import {
  CHANGE_SIZE,
  DEFAULT_ACTION
} from './constants'

export function setFirstResolution(width, height) {
  return {
    type: CHANGE_SIZE,
    res: {
      width: width,
      height: height
    }
  }
}

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  }
}

