import React from 'react';
import PropTypes from 'prop-types';
import { Provider as ReduxProvider } from 'react-redux';
import { IntlProvider } from 'react-intl-redux';
import { BrowserRouter as Router } from 'react-router-dom';

export const storeShape = {
  subscribe: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired,
};

const AppWrapper = props => (
  <ReduxProvider
    store={props.store}
  >
    <IntlProvider>
      <Router>
        {props.children}
      </Router>
    </IntlProvider>
  </ReduxProvider>
);

AppWrapper.displayName = 'AppWrapper';

AppWrapper.propTypes = {
  store: PropTypes.shape(storeShape).isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};

AppWrapper.defaultProps = {
  children: [],
};

export default AppWrapper;
