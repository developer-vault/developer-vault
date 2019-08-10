import { transform } from 'lodash';

import sassConfig from 'style/config.variables.scss';

/**
 * @type {object.<string, number>} Breakpoint name -> Breakpoint max size in px.
 */
export const BREAKPOINTS_MAP = transform(
  sassConfig.breakpoints,
  (breakpoints, bpValue, bpName) => {
    breakpoints[bpName] = parseInt(bpValue, 10);
  },
);
