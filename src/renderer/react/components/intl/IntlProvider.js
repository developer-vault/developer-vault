import { connect } from 'react-redux';

import { selectLocaleBundle } from 'redux/stores/intl/selectors';

import { IntlProvider as ReactIntlProvider } from 'react-intl';

export default connect(selectLocaleBundle)(ReactIntlProvider);
