import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import AppWrapper from './AppWrapper';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppWrapper><App /></AppWrapper>, div);
  ReactDOM.unmountComponentAtNode(div);
});
