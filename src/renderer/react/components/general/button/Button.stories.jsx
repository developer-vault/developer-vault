import React from 'react';
import { FormattedMessage } from 'react-intl';

import { storiesOf } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs/react';

import Button from './Button';

import messages from './Button.stories.messages';

storiesOf('Components/General/Button', module)
  .add('Simple button', withNotes('Simple button')(() => (
    <Button
      disabled={boolean('Disabled', false)}
      label={text('Label', 'My button')}
      onClick={action('clicked')}
    />
  )))
  .add('Using locales', withNotes('With intl')(() => (
    <Button
      disabled={boolean('Disabled', false)}
      label={<FormattedMessage {...messages.CLICK_ME} />}
      onClick={action('clicked')}
    />
  )));
