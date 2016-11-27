import { getAsyncInjectors  } from './libs/asyncInjectors'

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err) // eslint-disable-line no-console

}

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default)
}

export function createRootComponent(store, cb) {
  const { injectReducer, injectSagas  } = getAsyncInjectors(store) //eslint-disable-line no-unused-vars

  const importModules = Promise.all([
    System.import('./containers/App/reducer'),
    System.import('./containers/App/index.jsx'),
  ])

  const renderRoute = loadModule(cb)

  importModules.then(([reducer, component]) => {
    injectReducer('App', reducer.default)
    renderRoute(component)

  })

  importModules.catch(errorLoading)
}

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas  } = getAsyncInjectors(store) //eslint-disable-line no-unused-vars

  // reducers for each container component can easily be inserted
  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        System.import('./containers/HomePage/index.jsx')
          .then(loadModule(cb))
          .catch(errorLoading)
      },
    },
    {
      path: '/generate',
      name: 'generate',
      getComponent(nextState, cb) {
        System.import('./containers/GeneratePage/index.jsx')
          .then(loadModule(cb))
          .catch(errorLoading)
      },
    },
    {
      path: '/number',
      name: 'number',
      getComponent(nextState, cb) {
        System.import('./containers/NumberPage/index.jsx')
          .then(loadModule(cb))
          .catch(errorLoading)
      },
    },
    {
      path: '/about',
      name: 'about',
      getComponent(nextState, cb) {
        System.import('./containers/AboutPage/index.jsx')
          .then(loadModule(cb))
          .catch(errorLoading)
      },
    },
    {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        System.import('./containers/NotFoundPage/index.jsx')
          .then(loadModule(cb))
          .catch(errorLoading)
      },
    },
  ]
}
