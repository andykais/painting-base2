
var System = {};
System.import = function(path) {
  return Promise.resolve(require(path));
};


import { createStore, applyMiddleware, compose } from 'redux'
import { fromJS } from 'immutable'
import { routerMiddleware } from 'react-router-redux'
import createReducer from './reducers'

const devtools = window.devToolsExtension || (() => noop => noop)

export default function configureStore(initialState = {}, history) {
  const middlewares = [
    routerMiddleware(history),

  ]

  const enhancers = [
    applyMiddleware(...middlewares),
    devtools()
  ]

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    compose(...enhancers)
  )

  if (module.hot) {
    System.import('./reducers').then((reducerModule) => {
      const createReducers = reducerModule.default
      const nextReducers = createReducers(store.asyncReducers)

      store.replaceReducer(nextReducers)

    })
  }

  // Initialize it with no other reducers
  store.asyncReducers = {}
  return store
}
