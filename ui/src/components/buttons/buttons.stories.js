import React from 'react';
import {storiesOf} from '@storybook/react';
import {PrimaryButton} from './index.js';

const buttonColumnStyles = {
  width: '33.33%'
};

storiesOf('Components/Buttons/Primary Button', module)
  .add('buttons', () =>
    <React.Fragment>
      <h3>Buttons</h3>
      <h4>Primary Button</h4>
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

