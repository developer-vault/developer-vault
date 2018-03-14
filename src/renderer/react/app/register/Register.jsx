import React from 'react';

import { send } from 'services/ipc';
import { SET_KEY } from 'common/events';

import RegisterPresentation from './RegisterPresentation';

export const RegisterContainer = Presentation => class Register extends React.PureComponent {
  state = {
    password: '',
    confirm: '',
  };

  onChangePassword = event => this.setState({ password: event.target.value });
  onChangeConfirm = event => this.setState({ confirm: event.target.value });
  onSubmit = async () => {
    await send(SET_KEY, this.state.password);
    /**
     * @todo
     * @assignee maxence-lefebvre
     * Notify success
     * Redirect to Home when key is set.
     */
  };

  /** Renders component. */
  render() {
    const { password, confirm } = this.state;

    return (
      <Presentation
        password={password}
        confirm={confirm}
        isSubmitDisabled={password !== confirm}
        onChangePassword={this.onChangePassword}
        onChangeConfirm={this.onChangeConfirm}
        onSubmit={this.onSubmit}
      />
    );
  }
};

export default RegisterContainer(RegisterPresentation);
