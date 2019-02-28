import Header from './index.js';
import React from 'react';
import StoryRouter from 'storybook-react-router';
import {storiesOf} from '@storybook/react';

storiesOf('Components/Shared', module)
  .addDecorator(StoryRouter())
  .add('Header', () =>
    <Header />
  );

