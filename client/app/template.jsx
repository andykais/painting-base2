import React from 'react';
import { Link } from 'react-router';

class Layout extends React.Component {
  render() {
    return (
      <div className="app-container">
        <header>
          <Link to="/">
            <h1> Time to go Home </h1>
          </Link>
        </header>
        <div className="app-content">{this.props.children}</div>
        <footer>
          <p>
            Can put some links or info down here.
          </p>
        </footer>
      </div>
    );
  }
}

export default Layout
