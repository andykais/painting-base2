import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, hashHistory } from 'react-router';
import App from './app/app.jsx';
import Generate from './app/generate.jsx';
import ImageUpload from './app/imageUpload.jsx'
import NotFound404 from './app/notFoundPage.jsx'


//const NoMatch = React.createClass({[>...<]})
      //<Route path="*" component={NoMatch}/>

render((

  <Router>
    <Route path="/" component={App}/>
    <Route path="/generate" component={Generate}/>
    <Route path="/upload" component={ImageUpload}/>
    <Route path="*" component={NotFound404}/>
  </Router>
), document.getElementById('root'))
