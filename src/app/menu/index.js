const { Menu } = require('electron');

const help = require('./help');

const template = [
  help,
];

const makeMenu = () => {
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};

module.exports = {
  template,
  makeMenu,
};
