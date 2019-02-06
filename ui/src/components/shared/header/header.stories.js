import React from 'react';
import {storiesOf} from '@storybook/react';
import {Header} from './index.js';

storiesOf('Components/Shared', module)
  .add('Header', () =>
    <Header />
  );

