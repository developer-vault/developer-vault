import 'services/raven';

import React from 'react';
import ReactDOM from 'react-dom';
import store from 'redux/store';

/**
 * @todo
 * @assignee anyone
 * Customize reapopTheme and remove theme-wybo and font-awesome 4 dependency
 */
import reapopTheme from 'reapop-theme-wybo';
import 'font-awesome/css/font-awesome.min.css';

import { setLocale } from 'services/i18n';

import App from './react/App';
import AppWrapper from './react/AppWrapper';

import './index.css';

Promise.all([setLocale()])
  .then(() => {
    ReactDOM.render(
      <AppWrapper
        store={store}
        reapopTheme={reapopTheme}
      >
        <App />
      </AppWrapper>,
      document.getElementById('root'),
    );
  });

