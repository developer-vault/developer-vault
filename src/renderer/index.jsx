import 'services/raven';

import React from 'react';
import ReactDOM from 'react-dom';
import store from 'redux/store';
import { setLocale } from 'services/i18n';

import App from './react/App';
import AppWrapper from './react/AppWrapper';

import './index.css';

Promise.all([setLocale()])
  .then(() => {
    ReactDOM.render(
      <AppWrapper store={store}>
        <App />
      </AppWrapper>,
      document.getElementById('root'),
    );
  });

