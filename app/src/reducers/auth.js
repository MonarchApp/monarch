import ActionTypes from 'constants/actions';
import Immutable from 'immutable';
import {createReducer} from 'redux-immutablejs';

const initialState = Immutable.Map({
  isAuthenticated: false,
  token: ''
});

export default createReducer(initialState, {
  [ActionTypes.Auth.LOGIN_FAILURE]: (state) => state.merge({
    isAuthenticated: false
  }),

  [ActionTypes.Auth.LOGIN_SUCCESS]: (state, {payload}) => state.merge({
    isAuthenticated: true,
    token: payload.token
  })
});
