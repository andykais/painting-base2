/*
 * main App actions
 * each action is sent to the reducer to update the state
 */

import {
  CHANGE_SIZE,
    GENERATE_RANDOM_CANVASDATA,
    INC_IMG_BY_PERCENT,
    INC_IMG_BY_NUMBER,
    SET_SHOULD_RENDER_TO_TRUE,
    SET_SHOULD_RENDER_TO_FALSE,
    CHANGE_INCREMENT_NUMBER,
    SET_CANVASDATA,
} from './constants'

export function tellCanvasToUpdate() {
  return {
    type: SET_SHOULD_RENDER_TO_TRUE
  }
}

export function tellCanvasToStopUpdating() {
  return {
    type: SET_SHOULD_RENDER_TO_FALSE
  }
}

export function setImageData(canvasData) {
  return {
    type: SET_CANVASDATA,
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

export function changeSide(sideLength) {
  return {
    type: CHANGE_SIZE,
    side: sideLength
  }
}

export function generateRandomCanvasData() {
  return {
    type: GENERATE_RANDOM_CANVASDATA
  }
}
