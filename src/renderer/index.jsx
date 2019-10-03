import React from 'react';
import ReactDOM from 'react-dom';

/**
 * @todo
 * @assignee anyone
 * Customize reapopTheme and remove theme-wybo and font-awesome 4 dependency
 */
import reapopTheme from 'reapop-theme-wybo';
import 'font-awesome/css/font-awesome.min.css';

import store from 'redux/store';
import 'services/sentry';

import { setLocale } from 'services/i18n';

import App from './react/App';
import AppWrapper from './react/AppWrapper';

import { isInitializedAction } from './redux/stores/app/actions';

import { bootstrapModules } from './services/modules';

import './style/main.scss';

bootstrapModules();

Promise.all([setLocale(), store.dispatch(isInitializedAction())])
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
