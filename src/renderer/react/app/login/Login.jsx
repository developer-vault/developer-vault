import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { notify, STATUS } from 'reapop';

import { loginAction } from 'redux/stores/app/actions';

import LoginPresentation from './LoginPresentation';
import messages from './login.messages';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    login: loginAction,
    notify,
  }, dispatch),
});

export const LoginContainer = (Presentation) => {
  const enhancer = compose(
    injectIntl,
    connect(undefined, mapDispatchToProps),
  );

  class Login extends React.Component {
    static propTypes = {
      /** From connect/ Mapped redux actions. */
      actions: PropTypes.shape({
        /** Called on form submission. */
        login: PropTypes.func,
        /** Notify action. */
        notify: PropTypes.func,
      }).isRequired,
      /** From injectIntl. */
      intl: intlShape.isRequired,
    };

    state = {
      password: '',
      redirectToHome: false,
    };

    /**
     * Binds password state to input.
     *
     * @param {{target: {value: string}}} event - The DOM Event.
     */
    onChangePassword = event => this.setState({ password: event.target.value });

    /**
     * On form submit, sends the key to the main process.
     *
     * @async
     */
    onSubmit = async () => {
      await this.props.actions.login(this.state.password);
      /**
       * @todo
       * @assignee maxence-lefebvre
       * Handle login failure.
       * Handle state decryption.
       */
      this.props.actions.notify({
        message: this.props.intl.formatMessage(messages.SUCCESS_NOTIFICATION_MESSAGE),
        status: STATUS.success,
        dismissible: true,
      });
      this.setState({ redirectToHome: true });
    };

    /** Renders component. */
    render() {
      const { password, redirectToHome } = this.state;

      if (redirectToHome) {
        return <Redirect to="/home" />;
      }

      return (
        <Presentation
          password={password}
          submitDisabled={!password}
          onChangePassword={this.onChangePassword}
          onSubmit={this.onSubmit}
        />
      );
    }
  }

  return enhancer(Login);
};

export default LoginContainer(LoginPresentation);
