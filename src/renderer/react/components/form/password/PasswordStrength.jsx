import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import zxcvbn from 'zxcvbn';
import memoize from 'fast-memoize';

import { concat } from 'services/css';

import messages from './password-strength.messages';
import classNames from './password-strength.module.scss';

export default class PasswordStrength extends React.PureComponent {
  static propTypes = {
    password: PropTypes.string,
  };

  static defaultProps = {
    password: '',
  };

  getStrength = memoize(password => (password.length === 0 ? { score: -1 } : zxcvbn(password)));

  /** Renders component. */
  render() {
    const strength = this.getStrength(this.props.password);
    return (
      <div className={classNames.container}>

        {
          [0, 3, 4].map(score => (
            <div
              key={score}
              className={concat(classNames.strengthStep, score <= strength.score ? classNames.active : '')}
            />
          ))
        }

        <div className={classNames.scoreHintContainer}>
          {
            strength.score >= 0 && (
              <span className={classNames.scoreHint}>
                <FormattedMessage
                  id={messages.scores[strength.score]}
                />
              </span>
            )
          }
        </div>

        <div>
          <pre>
            {
              JSON.stringify(strength, undefined, 4)
            }
          </pre>
        </div>
      </div>
    );
  }
}
