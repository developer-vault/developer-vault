import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { register } from 'redux/app/actions';

import RegisterPresentation from './RegisterPresentation';

export const RegisterContainer = Presentation => class Register extends React.Component {
  static propTypes = {
    actions: PropTypes.shape({
      register: PropTypes.func,
    }).isRequired,
  };

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
    await this.props.actions.register(this.state.password);
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

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ register }, dispatch),
});

export default connect(undefined, mapDispatchToProps)(RegisterContainer(RegisterPresentation));
