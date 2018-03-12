import React from 'react';
import zxcvbn from 'zxcvbn';
import { FormattedMessage } from 'react-intl';

import { SCORE_TO_MESSAGE_ID } from './register.messages';

export default class Register extends React.PureComponent {
  state = {
    password: '',
    confirm: '',
    strength: {
      score: 0,
      feedback: {
        warning: '',
        suggestions: '',
      },
    },
  };

  onChangePassword = (event) => {
    const password = event.target.value;
    const strength = zxcvbn(password);
    this.setState({
      password,
      strength,
    });
  };

  onChangeConfirm = event => this.setState({ confirm: event.target.value });

  /** Renders component. */
  render() {
    const { password, confirm, strength } = this.state;

    return (
      <div>
        <div>
          <div>
            <input type="password" value={password} onChange={this.onChangePassword} />
            <input type="password" value={confirm} onChange={this.onChangeConfirm} />
          </div>
          <div>
            <button disabled={password !== confirm}>Submit</button>
          </div>
        </div>
        <div>
          <FormattedMessage
            id="app.register.password.strength"
            defaultMessage="Password strength: "
          />
          <FormattedMessage
            id={SCORE_TO_MESSAGE_ID[strength.score]}
          />
        </div>
      </div>
    );
  }
}
