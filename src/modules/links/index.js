import Links from './renderer/node/Links';
import manifest from './manifest.json';
import icon from './icon.svg';

export default {
  manifest,
  icon,
  renderer: {
    node: Links,
  },
};
