/* main App actions
 * each action is sent to the reducer to update the state
 */


import {
  CHANGE_SIZE,
    CHANGE_PERCENT,
    PERCENT_CHANGED,
    CHANGE_STRING,
    SET_CANVAS_DATA,
    INC_IMG_BY_PERCENT,
    INC_IMG_BY_NUMBER,
    SET_SHOULD_RENDER_TO_FALSE,
} from './constants'


export function tellCanvasToStopUpdating() {
  return {
    type: SET_SHOULD_RENDER_TO_FALSE
  }
}

export function setImageData(canvasData) {
  return {
    type: SET_CANVAS_DATA,
    canvasData: canvasData
  }
}

export function incImageDataByPercent(percent) {
  return {
    type: INC_IMG_BY_PERCENT,
    percent: percent

  }
}

export function incImageDataByNumber(num) {
  return {
    type: INC_IMG_BY_NUMBER,
    number: num
  }
}

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
