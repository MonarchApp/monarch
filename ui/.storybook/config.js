import {configure} from '@storybook/react';
import '../src/theme';
import './storybook';

const req = require.context('../src', true, /\.stories\.js$/);

const loadStories = () => {
  req.keys().forEach(req);
};

configure(loadStories, module);
