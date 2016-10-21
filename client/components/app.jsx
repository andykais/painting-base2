import React from 'react';
import {Link} from 'react-router';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    return (
        <div id="app-container">
          <header>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/generate'>Generate</Link></li>
              <li><Link to='/upload'>Upload</Link></li>
            </ul>
          </header>
          <div className='app-content'>{this.props.children}</div>
          <footer></footer>
        </div>
    )
  }
}

export default App
