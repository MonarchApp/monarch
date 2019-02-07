import React from 'react';
import {configure, addDecorator} from '@storybook/react';
import '../src/theme';
import './storybook';

addDecorator(story =>
  <div className='story-wrapper'>{story()}</div>
);

const req = require.context('../src', true, /\.stories\.js$/);

const loadStories = () => {
  req.keys().forEach(req);
};

configure(loadStories, module);
