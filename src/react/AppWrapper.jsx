import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';

import messages from 'i18n/messages.json';

// @todo maxence-lefebvre
// I should get react-intl locale too...
// But first, I'll connect redux to the application

const AppWrapper = props => (
  <IntlProvider
    key={props.locale}
    locale={props.locale}
    messages={messages[props.locale]}
  >
    { props.children }
  </IntlProvider>
);

AppWrapper.propTypes = {
  locale: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};

AppWrapper.defaultProps = {
  locale: 'en',
  children: [],
};

export default AppWrapper;
