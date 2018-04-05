import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { FormattedMessage } from 'react-intl';

import Button from 'react/components/general/button/Button';
import PasswordStrength from 'react/components/form/password/PasswordStrength';

import classNames from './register.module.scss';

const RegisterPresentation = props => (
  <div className={classNames.container}>
    {
      /**
       * @todo
       * @assignee maxence-lefebvre
       * Add register description
       */
    }
    <div className={classNames.formContainer}>
      <input type="password" value={props.password} onChange={props.onChangePassword} />
      <PasswordStrength
        password={props.password}
      />
      <input type="password" value={props.confirm} onChange={props.onChangeConfirm} />
    </div>
    <div>
      <Button
        onClick={props.onSubmit}
        disabled={props.submitDisabled}
        label={
          <FormattedMessage
            id="app.register.submit.button.label"
            defaultMessage="Create my encrypted database"
          />
        }
      />
    </div>
  </div>
);

RegisterPresentation.displayName = 'RegisterPresentation';
RegisterPresentation.propTypes = {
  password: PropTypes.string,
  confirm: PropTypes.string,
  submitDisabled: PropTypes.bool,
  onChangePassword: PropTypes.func,
  onChangeConfirm: PropTypes.func,
  onSubmit: PropTypes.func,
};
RegisterPresentation.defaultProps = {
  password: '',
  confirm: '',
  submitDisabled: false,
  onChangePassword: noop,
  onChangeConfirm: noop,
  onSubmit: noop,
};

export default RegisterPresentation;
