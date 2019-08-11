import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { notify, STATUS } from 'reapop';
import { Redirect } from 'react-router-dom';

import { intlShape } from 'react/shapes/vendor';
import { registerAction } from 'redux/stores/app/actions';

import RegisterPresentation from './RegisterPresentation';
import messages from './register.messages';

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ register: registerAction, notify }, dispatch),
});

export const RegisterContainer = (Presentation) => {
  const enhancer = compose(
    injectIntl,
    connect(null, mapDispatchToProps),
  );

  class Register extends React.Component {
    static propTypes = {
      /** From connect/ Mapped redux actions. */
      actions: PropTypes.shape({
        /** Called on form submission. */
        register: PropTypes.func,
        /** Notify action. */
        notify: PropTypes.func,
      }).isRequired,
      /** From injectIntl. */
      intl: intlShape.isRequired,
    };

    state = {
      password: '',
      confirm: '',
      redirectToHome: false,
    };

    /**
     * Binds password state to input.
     *
     * @param {{target: {value: string}}} event - The DOM Event.
     */
    onChangePassword = (event) => this.setState({ password: event.target.value });

    /**
     * Binds confirm state to input.
     *
     * @param {{target: {value: string}}} event - The DOM Event.
     */
    onChangeConfirm = (event) => this.setState({ confirm: event.target.value });

    /**
     * On form submit, sends the key to the main process.
     *
     * @async
     */
    onSubmit = async () => {
      await this.props.actions.register(this.state.password);
      this.props.actions.notify({
        message: this.props.intl.formatMessage(messages.SUCCESS_NOTIFICATION_MESSAGE),
        status: STATUS.success,
        dismissible: true,
      });
      this.setState({ redirectToHome: true });
    };

    /**
     * Submit should be disabled :
     * - if the form is pristine.
     * - if confirm is not equal to password.
     *
     * @returns {boolean} - Should submit be disabled ?
     */
    isSubmitDisabled = () => {
      const { password, confirm } = this.state;
      const isPasswordPristine = !password;
      const isConfirmInvalid = password !== confirm;

      return isPasswordPristine || isConfirmInvalid;
    };

    /** @returns {object} JSX. */
    render() {
      const { password, confirm, redirectToHome } = this.state;

      if (redirectToHome) {
        return <Redirect to="/home" />;
      }

      return (
        <Presentation
          password={password}
          confirm={confirm}
          submitDisabled={this.isSubmitDisabled()}
          onChangePassword={this.onChangePassword}
          onChangeConfirm={this.onChangeConfirm}
          onSubmit={this.onSubmit}
        />
      );
    }
  }

  return enhancer(Register);
};

export default RegisterContainer(RegisterPresentation);
