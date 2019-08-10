import { Menu } from 'electron';

import EVENTS from 'shared/events';

import help from './help';
import { on } from '../services/ipc';

export const template = [
  help,
];

export const makeMenu = () => {
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  on(EVENTS.OPEN_MENU_POPUP, async (...args) => {
    /**
     * @todo
     * @assignee maxence-lefebvre
     *
     * Remove test code when menu is complete
     */
    // for example and test purposes :
    // eslint-disable-next-line no-console
    console.log(EVENTS.OPEN_MENU_POPUP, ...args);
    menu.popup();
    return true;
  });
};
