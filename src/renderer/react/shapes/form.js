import PropTypes from 'prop-types';

export const formShape = PropTypes.shape({
  getFieldDecorator: PropTypes.func,
  validateFields: PropTypes.func,
  getFieldProps: PropTypes.func,
});
