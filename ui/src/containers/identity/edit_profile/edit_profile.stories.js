import React from 'react';
import configureStore from 'redux-mock-store';
import {EditProfileForm} from './index.js';
import {Provider} from 'react-redux';
import {storiesOf} from '@storybook/react';
import {reducer} from 'redux-form';

const initialState = reducer({});
const store = configureStore([])(initialState);

storiesOf('Containers', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('Edit Profile', () =>
    <div className='col-2'>
      <EditProfileForm />
    </div>
  );

