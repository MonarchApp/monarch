import React from 'react';
import {storiesOf} from '@storybook/react';
import {PrimaryButton} from './index.js';

storiesOf('Components/Buttons', module)
  .add('Primary Button', () =>
    <React.Fragment>
      <dl className='col-4'>
        <dt>Enabled</dt>
        <dd>
          <PrimaryButton text='Button' />
        </dd>
        <dt>Disabled</dt>
        <dd>
          <PrimaryButton text='Button' disabled />
        </dd>
      </dl>
    </React.Fragment>
  );

