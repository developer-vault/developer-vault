import * as storybook from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import { withKnobs } from '@storybook/addon-knobs';
import { setIntlConfig, withIntl } from 'storybook-addon-intl';
import { addLocaleData } from 'react-intl';

// ================= INTL =================
import enLocaleData from 'react-intl/locale-data/en';
import frLocaleData from 'react-intl/locale-data/fr';

// Can't use paths.js here because this process can't access fs.
import messages from '../../src/i18n/messages.json';

const getMessages = locale => messages[locale];

addLocaleData(frLocaleData);
addLocaleData(enLocaleData);

setIntlConfig({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  getMessages,
});

// ================= OPTIONS =================
setOptions({
  /**
   * name to display in the top left corner
   * @type {String}
   */
  name: 'Developer Vault',
  /**
   * URL for name in top left corner to link to
   * @type {String}
   */
  url: 'https://github.com/developer-vault/developer-vault',
  /**
   * show story component as full screen
   * @type {Boolean}
   */
  goFullScreen: false,
  /**
   * display panel that shows a list of stories
   * @type {Boolean}
   */
  showStoriesPanel: true,
  /**
   * display panel that shows addon configurations
   * @type {Boolean}
   */
  showAddonPanel: true,
  /**
   * display floating search box to search through stories
   * @type {Boolean}
   */
  showSearchBox: false,
  /**
   * show addon panel as a vertical panel on the right
   * @type {Boolean}
   */
  addonPanelInRight: true,
  /**
   * sorts stories
   * @type {Boolean}
   */
  sortStoriesByKind: false,
  /**
   * regex for finding the hierarchy separator
   * @example:
   *   null - turn off hierarchy
   *   /\// - split by `/`
   *   /\./ - split by `.`
   *   /\/|\./ - split by `/` or `.`
   * @type {Regex}
   */
  hierarchySeparator: /\//,
  /**
   * regex for finding the hierarchy root separator
   * @example:
   *   null - turn off mulitple hierarchy roots
   *   /\|/ - split by `|`
   * @type {Regex}
   */
  hierarchyRootSeparator: /\|/,
  /**
   * sidebar tree animations
   * @type {Boolean}
   */
  sidebarAnimations: false,
  /**
   * id to select an addon panel
   * @type {String}
   */
  selectedAddonPanel: undefined,
});

// ================= DECORATORS =================
storybook.addDecorator(withIntl);

storybook.addDecorator(withKnobs);

// ================= STORIES LOADER =================
const loadStories = () => {
  // Can't use paths.js here because this process can't access fs.
  const req = require.context('../../src/react', true, /\.stories\.jsx$/);
  req.keys().forEach(filename => req(filename));
};

storybook.configure(loadStories, module);
