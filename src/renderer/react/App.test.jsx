import React from 'react';
import ReactDOM from 'react-dom';
import store from 'redux/store';

import App from './App';
import AppWrapper from './AppWrapper';

jest.mock('redux/store');

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <AppWrapper store={store}>
      <App />
    </AppWrapper>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
