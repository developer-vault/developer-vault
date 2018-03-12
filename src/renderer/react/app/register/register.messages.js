import { defineMessages } from 'react-intl';

defineMessages({
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

export const SCORE_TO_MESSAGE_ID = [
  'app.register.password.strength.too_guessable',
  'app.register.password.strength.very_guessable',
  'app.register.password.strength.somewhat_guessable',
  'app.register.password.strength.safely_unguessable',
  'app.register.password.strength.very_unguessable',
];

export default {
  SCORE_TO_MESSAGE_ID,
};
