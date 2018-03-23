import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

const Button = ({
  disabled, label, onClick,
}) => (
  <button disabled={disabled} onClick={onClick}>
    {label}
  </button>
);

Button.defaultProps = {
  disabled: false,
  onClick: noop,
};

Button.propTypes = {
  /** Boolean indicating whether the button should render as disabled */
  disabled: PropTypes.bool,
  /** Button label. */
  label: PropTypes.node.isRequired,
  /** onClick handler */
  onClick: PropTypes.func,
};

export default Button;
