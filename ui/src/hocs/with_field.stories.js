
import React from 'react';
import { storiesOf } from '@storybook/react';
import withField from './with_field.js';

const InputField = withField('input');
const input = {
  name: 'input'
};

const metaWithError = {
  error: 'SHIT HAS HIT THE FAN BOIII'
};

storiesOf('HOCs/With Field', module)
  .add('Input', () =>
    <React.Fragment>
      <InputField input={input} label='Default' type='text'/>
      <InputField input={input} label='With Error' meta={metaWithError} type='text'/>
    </React.Fragment>
  );

