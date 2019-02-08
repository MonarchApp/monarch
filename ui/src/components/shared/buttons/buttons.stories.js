import React from 'react';
import {storiesOf} from '@storybook/react';
import {PrimaryButton} from './index.js';

storiesOf('Components/Shared', module)
  .add('Button', () =>
    <div className='col-4'>
      <h3>Primary</h3>
      <dl>
        <dt>Enabled</dt>
        <dd>
          <PrimaryButton text='Button' />
        </dd>
        <dt>Disabled</dt>
        <dd>
          <PrimaryButton text='Button' disabled />
        </dd>
      </dl>
    </div>
  );

