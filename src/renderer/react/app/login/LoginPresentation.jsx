import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { noop } from 'lodash';

import Button from 'react/components/general/button/Button';

import classNames from './login.module.scss';

const LoginPresentation = props => (
  <div className={classNames.container}>
    {
      /**
       * @todo
       * @assignee maxence-lefebvre
       * Add a description.
       */
    }
    <input type="password" value={props.password} onChange={props.onChangePassword} />
    <Button
      label={
        <FormattedMessage
          id="app.login.submit.button.label"
          defaultMessage="Se connecter"
        />}
      disabled={props.isSubmitDisabled}
      onClick={props.onSubmit}
    />
  </div>
);

LoginPresentation.propTypes = {
  password: PropTypes.string,
  isSubmitDisabled: PropTypes.bool,
  onChangePassword: PropTypes.func,
  onSubmit: PropTypes.func,
};

LoginPresentation.defaultProps = {
  password: '',
  isSubmitDisabled: false,
  onChangePassword: noop,
  onSubmit: noop,
};

export default LoginPresentation;
