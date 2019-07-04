import { addLocaleData } from 'react-intl';

import 'moment/locale/fr';
import intlLocale from 'react-intl/locale-data/fr';
import messages from './messages.po';

addLocaleData(intlLocale);

export default { intlLocale, messages };
