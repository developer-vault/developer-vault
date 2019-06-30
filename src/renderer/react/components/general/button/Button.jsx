import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

const Button = ({
  type,
  disabled,
  label,
  onClick,
}) => (
  // Type is passed as default props.
  // eslint-disable-next-line react/button-has-type
  <button
    type={type}
    disabled={disabled}
    onClick={onClick}
  >
    {label}
  </button>
);

Button.defaultProps = {
  type: 'button',
  disabled: false,
  onClick: noop,
};

Button.propTypes = {
  /** Button type. */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  /** Boolean indicating whether the button should render as disabled. */
  disabled: PropTypes.bool,
  /** Button label. */
  label: PropTypes.node.isRequired,
  /** Handler for onClick event. */
  onClick: PropTypes.func,
};

export default Button;
