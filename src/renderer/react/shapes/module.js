import PropTypes from 'prop-types';

export const moduleShape = {
  icon: PropTypes.node,
  manifest: PropTypes.shape({
    name: PropTypes.string.isRequired,
    displayName: PropTypes.string,
    description: PropTypes.string.isRequired,
  }),
};
