import React from 'react';
import ReactDOM from 'react-dom';
import store from 'redux/store';

import reapopTheme from 'reapop-theme-wybo';

import App from './App';
import AppWrapper from './AppWrapper';

jest.mock('renderer/redux/store');

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <AppWrapper
      store={store}
      reapopTheme={reapopTheme}
    >
      <App />
    </AppWrapper>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
