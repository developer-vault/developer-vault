import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import PropTypes from 'prop-types';

export const storeShape = {
  subscribe: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired,
};

const AppWrapper = props => (
  <ReduxProvider
    store={props.store}
  >
    { props.children }
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
