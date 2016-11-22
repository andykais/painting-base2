import 'babel-polyfill' // imports missing libs like System.import

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux' // propogates the store throughout application
import { applyRouterMiddleware, Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import useScroll from 'react-router-scroll'
import configureStore from './store' //import state manager
import './index.scss' // import styles

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)()`
const initialState = {}
const store = configureStore(initialState, browserHistory)

// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), selectLocationState
// must be provided for resolving how to retrieve the "route" in the state
import { selectLocationState } from './containers/App/selectors'

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: selectLocationState(),
})

// Set up the router, wrapping all Routes in the App component
import App from './containers/App/index.jsx'
import createRoutes from './routes'

import { createRootComponent } from './routes'

// create root app and inject reducer
const AppRoot = createRootComponent(store, function() {
  const rootRoute = {
    component: App,
    childRoutes: createRoutes(store),
  }

  const render = () => {
    ReactDOM.render(
      <Provider store={store}>
        <Router
          history={browserHistory}
          routes={rootRoute}
          onUpdate={() => window.scrollTo(0, 0)}
        />
      </Provider>,
      document.getElementById('root')
    )
  }
  window.onload = () => {
    render()
  }

})


