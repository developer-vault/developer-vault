import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import zxcvbn from 'zxcvbn';
import memoize from 'memoize-one';
import cn from 'classnames';

import messages, { scores, SCORES } from './password-strength.messages';
import classNames from './password-strength.module.scss';

export default class PasswordStrength extends React.PureComponent {
  static propTypes = {
    /** The user password. */
    password: PropTypes.string,
  };

  static defaultProps = {
    password: '',
  };

  /**
   * (MEMOIZED).
   * Calculates password strength through zxcvbn.
   *
   * @param {string} password - The user password.
   * @returns {{score: number}} - User password's strength.
   * @example const { score } = this.getStrength('azerty123');
   */
  getStrength = memoize((password) => (password.length === 0 ? { score: -1 } : zxcvbn(password)));

  /** @returns {object} JSX. */
  render() {
    const strength = this.getStrength(this.props.password);
    return (
      <div className={classNames.container}>
        {
          /*
           * Displays strength tiles.
           * Adds "active" className when score is gte the visual tile.
           * Scores of 0,1,2 are all represented by a red tile.
           * Scores of 3 are represented by a orange tile.
           * Scores of 4 are represented by a green tile.
           */
        }
        {
          [SCORES.TOO_GUESSABLE, SCORES.SAFELY_UNGUESSABLE, SCORES.VERY_UNGUESSABLE]
            .map((score) => (
              <div
                key={score}
                className={cn(
                  classNames.strengthStep,
                  score <= strength.score && classNames.active,
                )}
              />
            ))
        }

        {
          /**
           * Displays strength hint in the user language.
           * For example for a score of 0 : it is too unguessable.
           */
        }
        <div className={classNames.scoreHintContainer}>
          {
            strength.score >= 0 && (
              <span className={classNames.scoreHint}>
                <FormattedMessage {...messages[scores[strength.score]]} />
              </span>
            )
          }
        </div>
      </div>
    );
  }
}
