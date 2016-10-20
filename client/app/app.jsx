import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

class App extends React.Component {
  render() {
    return(
            <div>
              <h1>Hello World</h1>

              <a href="/#/generate">Visit the generate page</a>
              <br></br>
              <a href="/#/upload">Visit the Upload page</a>
            </div>
          );
  }
}

export default App
