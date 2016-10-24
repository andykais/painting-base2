import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './routes.jsx';

window.onload = () => {
  ReactDOM.render(<AppRoutes/>, document.getElementById('root'));
};
