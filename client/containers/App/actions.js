/* main App actions
 * each action is sent to the reducer to update the state
 */


import {
  CHANGE_SIZE,
    GENERATE_RANDOM_CANVASDATA,
    INC_IMG_BY_PERCENT,
    INC_IMG_BY_NUMBER,
    SET_SHOULD_RENDER_TO_FALSE,
    CHANGE_INCREMENT_NUMBER,
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

export function changeIncrementNumber(number) {
  return {
    type: CHANGE_INCREMENT_NUMBER,
    number: number,
  }
}
