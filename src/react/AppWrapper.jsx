import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';

import messages from 'i18n/messages.json';

export const storeShape = {
  subscribe: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired,
};

const AppWrapper = props => (
  <ReduxProvider
    store={props.store}
  >
    <IntlProvider
      key={props.locale}
      locale={props.locale}
      messages={messages[props.locale]}
    >
    { props.children }
    </IntlProvider>
  </ReduxProvider>
);

AppWrapper.displayName = 'AppWrapper';

AppWrapper.propTypes = {
  locale: PropTypes.string,
  store: PropTypes.shape(storeShape).isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};

AppWrapper.defaultProps = {
  locale: 'en',
  children: [],
};

export default AppWrapper;
