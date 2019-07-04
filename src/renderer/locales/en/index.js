import { addLocaleData } from 'react-intl';

import 'moment/locale/en-gb';
import intlLocale from 'react-intl/locale-data/en';
import messages from './messages.po';

addLocaleData(intlLocale);

export default { intlLocale, messages };
