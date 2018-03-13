import React from 'react';

import PasswordStrength from 'react/components/form/password/PasswordStrength';

import classNames from './register.module.scss';

export default class Register extends React.PureComponent {
  state = {
    password: '',
    confirm: '',
  };

  onChangePassword = (event) => {
    const password = event.target.value;
    this.setState({
      password,
    });
  };

  onChangeConfirm = event => this.setState({ confirm: event.target.value });

  /** Renders component. */
  render() {
    const { password, confirm } = this.state;

    return (
      <div className={classNames.container}>
        {/* TODO: extract form to another component. Use rc-form */}
        <div className={classNames.formContainer}>
          <input type="password" value={password} onChange={this.onChangePassword} />
          <PasswordStrength
            password={password}
          />
          <input type="password" value={confirm} onChange={this.onChangeConfirm} />
        </div>
        <div>
          <button disabled={password !== confirm}>Submit</button>
        </div>
      </div>
    );
  }
}
