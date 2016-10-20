import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

class App extends React.Component {
  render() {
    return(
            <div>
              <h1>Hello World</h1>

              <Link to="/#/generate">Visit the generate page</Link>
              <br></br>
              <Link to="/#/upload">Visit the Upload page</Link>
            </div>
          );
  }
}

export default App
