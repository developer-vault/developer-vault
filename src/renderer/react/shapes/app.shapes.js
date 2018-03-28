import PropTypes from 'prop-types';

import { POSITIONS } from 'reapop';

export const storeShape = PropTypes.shape({
  subscribe: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired,
});

export const reapopThemeShape = PropTypes.shape({
  smallScreenMin: PropTypes.number.isRequired,
  smallScreenPosition: PropTypes.oneOf([
    POSITIONS.top,
    POSITIONS.bottom,
  ]),
  notificationsSystem: PropTypes.shape({
    className: PropTypes.string,
  }),
});
