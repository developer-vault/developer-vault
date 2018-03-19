import React from 'react';

import { setKey } from 'services/state';

import RegisterPresentation from './RegisterPresentation';

export const RegisterContainer = Presentation => class Register extends React.PureComponent {
  state = {
    password: '',
    confirm: '',
  };

  /**
   * Binds password state to input.
   *
   * @param {{target: {value: string}}} event - The DOM Event.
   */
  onChangePassword = event => this.setState({ password: event.target.value });

  /**
   * Binds confirm state to input.
   *
   * @param {{target: {value: string}}} event - The DOM Event.
   */
  onChangeConfirm = event => this.setState({ confirm: event.target.value });

  /**
   * On form submit, sends the key to the main process.
   *
   * @returns {Promise<void>} - Void.
   */
  onSubmit = async () => {
    await setKey(this.state.password);
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
