import PropTypes from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const formShape = PropTypes.shape({
  getFieldDecorator: PropTypes.func,
  validateFields: PropTypes.func,
  getFieldProps: PropTypes.func,
});
