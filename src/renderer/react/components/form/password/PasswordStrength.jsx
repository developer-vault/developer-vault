import React from 'react';
import PropTypes from 'prop-types';
import { compose, withPropsOnChange } from 'recompose';
import zxcvbn from 'zxcvbn';
import cn from 'classnames';

import { FormattedMessage } from 'react-intl';

import { SCORES } from './password-strength.constants';
import { messagesByScoreMap } from './password-strength.messages';
import classNames from './password-strength.module.scss';

const enhancer = compose(
  /** Compute password strength. */
  withPropsOnChange(
    ['password'],
    ({ password }) => ({
      strength: password
        ? zxcvbn(password)
        : { score: -1 },
    }),
  ),
);

export const BasePasswordStrength = ({ strength }) => (
  <div className={classNames.container}>
    {
      /**
       * Displays strength tiles.
       * Adds "active" className when score is gte the visual tile.
       * Scores of 0,1,2 are all represented by a red tile.
       * Scores of 3 are represented by a orange tile.
       * Scores of 4 are represented by a green tile.
       */
    }
    {
        [SCORES.TOO_GUESSABLE, SCORES.SAFELY_UNGUESSABLE, SCORES.VERY_UNGUESSABLE]
          .map(score => (
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
      { strength.score >= 0
        && (
          <span className={classNames.scoreHint}>
            <FormattedMessage {...messagesByScoreMap[strength.score]} />
          </span>
        ) }
    </div>
  </div>
);

BasePasswordStrength.displayName = 'BasePasswordStrength';

BasePasswordStrength.propTypes = {
  strength: PropTypes.shape({
    score: PropTypes.number.isRequired,
  }),
};

BasePasswordStrength.defaultProps = {
  strength: { score: -1 },
};

const PasswordStrength = enhancer(BasePasswordStrength);

PasswordStrength.displayName = 'PasswordStrength';

PasswordStrength.propTypes = {
  password: PropTypes.string,
};

PasswordStrength.defaultProps = {
  password: '',
};

export default PasswordStrength;
