import React from 'react';

import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs/react';

import PasswordStrength from './PasswordStrength';

storiesOf('Components/Form/Password/PasswordStrength', module)
  .add(
    'Sample Password Strength',
    () => (
      <PasswordStrength
        password={text('Password', 'azerty123')}
      />
    ),
    {
      notes: 'Use the knobs',
    },
  );
