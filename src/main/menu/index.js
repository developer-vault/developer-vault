// eslint does not allow me to put electron in devDependencies
// electron-builder does not allow me to put electron in dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
const { Menu } = require('electron');

const { OPEN_MENU_POPUP } = require('common/events');

const help = require('./help');
const { on } = require('../ipc');

const template = [
  help,
];

const makeMenu = () => {
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  on(OPEN_MENU_POPUP, (...args) => {
    /**
     * @TODO
     * @assignee maxence-lefebvre
     *
     * Remove test code when menu is complete
     */
    // for example and test purposes :
    // eslint-disable-next-line no-console
    console.log(OPEN_MENU_POPUP, ...args);
    menu.popup();
    return true;
  });
};

module.exports = {
  template,
  makeMenu,
};
