import React from 'react';
import {storiesOf} from '@storybook/react';
import {PrimaryButton} from './index.js';

const buttonColumnStyles = {
  width: '33.33%'
};

storiesOf('Components/Buttons', module)
  .add('Primary Button', () =>
    <React.Fragment>
      <dl style={buttonColumnStyles}>
        <dt>Enabled</dt>
        <dl>
          <PrimaryButton text='Button' />
        </dl>
        <dt>Disabled</dt>
        <dl>
          <PrimaryButton text='Button' disabled />
        </dl>
      </dl>
    </React.Fragment>
  );

