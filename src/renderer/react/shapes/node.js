import PropTypes from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const nodeShape = PropTypes.shape({
  id: PropTypes.string,
  label: PropTypes.string,
  parentId: PropTypes.string,
});
