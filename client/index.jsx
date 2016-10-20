import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router'
import App from './app/app.jsx'
import Generate from './app/generate.jsx'

//const NoMatch = React.createClass({[>...<]})
      //<Route path="*" component={NoMatch}/>

render((
    //<h1>test</h1>
    <Generate/>

  //<Router history={ browserHistory }>
    //<Route path="/" component={App}>
      //<Route path="generate" component={Generate}/>
    //</Route>
  //</Router>
), document.getElementById('root'))
