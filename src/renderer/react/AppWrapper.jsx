import React from 'react';
import PropTypes from 'prop-types';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import NotificationsSystem from 'reapop';

import IntlProvider from 'react/components/intl/IntlProvider';

import { reapopThemeShape, storeShape } from './shapes/app.shapes';

const AppWrapper = ({
  store,
  reapopTheme,
  children,
}) => (
  <ReduxProvider store={store}>
    <IntlProvider>
      <>
        <Router>
          {children}
        </Router>
        <NotificationsSystem theme={reapopTheme} />
      </>
    </IntlProvider>
  </ReduxProvider>
);

AppWrapper.displayName = 'AppWrapper';

AppWrapper.propTypes = {
  store: storeShape.isRequired,
  reapopTheme: reapopThemeShape.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};

AppWrapper.defaultProps = {
  children: [],
};

export default AppWrapper;
