import { defineMessages } from 'react-intl';

import { SCORES } from './password-strength.constants';

const messages = defineMessages({
  'app.register.password.strength.too_guessable': {
    id: 'app.register.password.strength.too_guessable',
    description: 'Description of a too guessable password',
    defaultMessage: 'Too guessable',
  },
  'app.register.password.strength.very_guessable': {
    id: 'app.register.password.strength.very_guessable',
    description: 'Description of a very guessable password',
    defaultMessage: 'Very guessable',
  },
  'app.register.password.strength.somewhat_guessable': {
    id: 'app.register.password.strength.somewhat_guessable',
    description: 'Description of a somewhat guessable password',
    defaultMessage: 'Somewhat guessable',
  },
  'app.register.password.strength.safely_unguessable': {
    id: 'app.register.password.strength.safely_unguessable',
    description: 'Description of a safely unguessable password',
    defaultMessage: 'Safely unguessable',
  },
  'app.register.password.strength.very_unguessable': {
    id: 'app.register.password.strength.very_unguessable',
    description: 'Description of a very unguessable password',
    defaultMessage: 'Very unguessable',
  },
});

export default messages;

export const messagesByScoreMap = {
  [SCORES.TOO_GUESSABLE]: messages['app.register.password.strength.too_guessable'],
  [SCORES.VERY_GUESSABLE]: messages['app.register.password.strength.very_guessable'],
  [SCORES.SOMEWHAT_GUESSABLE]: messages['app.register.password.strength.somewhat_guessable'],
  [SCORES.SAFELY_UNGUESSABLE]: messages['app.register.password.strength.safely_unguessable'],
  [SCORES.VERY_UNGUESSABLE]: messages['app.register.password.strength.very_unguessable'],
};
