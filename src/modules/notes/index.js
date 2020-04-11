import Notes from './renderer/node/Notes';
import manifest from './manifest.json';
import icon from './icon.svg';

export default {
  manifest,
  icon,
  renderer: {
    node: Notes,
  },
};
