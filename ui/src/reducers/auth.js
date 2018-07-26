import ActionTypes from 'constants/actions';
import Immutable from 'immutable';
import LocalStorageConstants from 'constants/local_storage';
import {createReducer} from 'redux-immutablejs';

const initialState = Immutable.Map({isAuthenticated: false});
const {TOKEN_KEY} = LocalStorageConstants;

export default createReducer(initialState, {
  [ActionTypes.Auth.LOGIN_FAILURE]: state => {
    localStorage.removeItem(TOKEN_KEY);
    return state.merge({isAuthenticated: false});
  },

  [ActionTypes.Auth.LOGIN_SUCCESS]: (state, {payload}) => {
    // TODO: Ugh. Let's just cookie / session this mother fucker.
    localStorage.setItem(TOKEN_KEY, payload.token);
    return state.merge({isAuthenticated: true});
  }
});
