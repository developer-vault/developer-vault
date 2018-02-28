import 'services/raven';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './react/App';
import AppWrapper from './react/AppWrapper';

ReactDOM.render(
  <AppWrapper locale="fr">
    <App />
  </AppWrapper>,
  document.getElementById('root'),
);
