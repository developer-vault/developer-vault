import React from 'react';
import { FormattedMessage } from 'react-intl';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs/react';

import Button from './Button';

import messages from './Button.stories.messages';

storiesOf('Components/General/Button', module)
  .add(
    'Simple button',
    () => (
      <Button
        disabled={boolean('Disabled', false)}
        label={text('Label', 'My button')}
        onClick={action('clicked')}
      />
    ),
    {
      notes: 'Simple button',
    },
  )
  .add(
    'Using locales',
    () => (
      <Button
        disabled={boolean('Disabled', false)}
        label={<FormattedMessage {...messages.CLICK_ME} />}
        onClick={action('clicked')}
      />
    ),
    {
      notes: 'With Intl',
    },
  );
