import React from 'react';

import { storiesOf } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';
import { text } from '@storybook/addon-knobs/react';

import PasswordStrength from './PasswordStrength';

storiesOf('Components/Form/Password/PasswordStrength', module)
  .add('Sample Password Strength', withNotes('Use the knobs')(() => (
    <PasswordStrength
      password={text('Password', 'azerty123')}
    />
  )));
