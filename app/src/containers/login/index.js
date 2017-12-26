import ActionTypes from 'constants/actions';
import React from 'react';
import ui from 'redux-ui';

const Login = ({username, password}) => (
  <div>
    <input value='{username}' />
    <input value='{password}' />
  </div>
);

const LoginWithUI = ui({
  key: 'login',
  state: {
    loading: false,
  },
  reducer: (state, action) => {
    const {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE} = ActionTypes.Auth;

    switch (action) {
    case LOGIN_REQUEST: return state.set('loading', true);
    case LOGIN_FAILURE, LOGIN_SUCCESS: return state.set('loading', false);
    default: return state;
    }
  }
})(Login);

export default LoginWithUI;
