import PropTypes from 'prop-types';

export const nodeShape = PropTypes.shape({
  id: PropTypes.string,
  label: PropTypes.string,
  parentId: PropTypes.string,
});

export const nodeTreeElement = PropTypes.shape({
  id: PropTypes.string,
  parentId: PropTypes.string,
  // Should be an arrayOf(nodeTreeElement) but I'd rather avoid recursion.
  children: PropTypes.array,
});
