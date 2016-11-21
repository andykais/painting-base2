import { getAsyncInjectors  } from './libs/asyncInjectors'

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err) // eslint-disable-line no-console

}

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default)
}

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas  } = getAsyncInjectors(store) //eslint-disable-line no-unused-vars

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('./containers/HomePage/reducer'),
          System.import('./containers/HomePage/index.jsx'),
        ])

        const renderRoute = loadModule(cb)

        importModules.then(([reducer, component]) => {
          injectReducer('homePage', reducer.default)
          renderRoute(component)

        })

        importModules.catch(errorLoading)
      },
    },
    {
      path: '/generate',
      name: 'generate',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('./containers/GeneratePage/reducer'),
          System.import('./containers/GeneratePage/index.jsx'),
        ])

        const renderRoute = loadModule(cb)

        importModules.then(([reducer, component]) => {
          injectReducer('generatePage', reducer.default)
          renderRoute(component)

        })

        importModules.catch(errorLoading)
      },
    },
    {
      path: '/about',
      name: 'about',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('./containers/AboutPage/index.jsx'),

        ])

        const renderRoute = loadModule(cb)

        importModules.then(([component]) => {
          renderRoute(component)

        })

        importModules.catch(errorLoading)
      }
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