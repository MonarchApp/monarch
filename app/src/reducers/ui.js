import ActionTypes from 'constants/actions';
import Immutable from 'immutable';
import {createReducer} from 'redux-immutablejs';

const initialState = Immutable.Map({
  ui: {
    login: {isLoading: false},
  }
});

const updateUi = (container, newUi) => state => state.merge({
  ui: {
    [container]: newUi
  }
});

export default createReducer(initialState, {
  [ActionTypes.Auth.LOGIN_REQUEST]: updateUi('login', {isLoading: true}),
  [ActionTypes.Auth.LOGIN_SUCCESS]: updateUi('login', {isLoading: false}),
  [ActionTypes.Auth.LOGIN_FAILURE]: updateUi('login', {isLoading: false}),
});
