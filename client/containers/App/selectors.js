import { fromJS } from 'immutable'
import { createSelector } from 'reselect'

  /**
   * Direct selector to the app state domain (specified in ~/routes.js)
   */
const selectAppDomain = () => state => state.get('App')

  /**
   * Other specific selectors
   * ( none so far )
   */

  /**
   * Default selector used by App
   */

const selectAppState = () => createSelector(
  selectAppDomain(),
  (substate) => substate.toJS()
)
// selectLocationState expects a plain JS object for the routing state
const selectLocationState = () => {
  let prevRoutingState
  let prevRoutingStateJS

  return (state) => {
    const routingState = state.get('route') // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState
      prevRoutingStateJS = routingState.toJS()
    }

    return prevRoutingStateJS
  }
}

export {
  selectLocationState,
    selectAppState
}
