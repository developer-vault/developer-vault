import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl-redux';

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
      { props.children }
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
