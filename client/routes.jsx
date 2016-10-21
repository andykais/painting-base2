import React from 'react';
import { Router, Route, IndexRoute, Link, browserHistory} from 'react-router'
import App from './components/app.jsx'
import Generate from './components/generate.jsx'
import IndexPage from './components/indexPage.jsx'
import NoMatch from './components/404NotFound.jsx'
import UploadImage from './components/imageUpload.jsx'


export default class AppRoutes extends React.Component {
  render() {
    return (
      <Router history={ browserHistory } onUpdate={() => window.scrollTo(0, 0)}>
        <Route name='home' path='/' component={App}>
          <IndexRoute component={IndexPage}/>
          <Route path='generate' component={Generate}/>
          <Route path='upload' component={UploadImage}/>
          <Route path='*' component={NoMatch}/>
        </Route>
      </Router>
    )
  }
}
