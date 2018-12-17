import ActionTypes from 'constants/actions';
import LocalStorageConstants from 'constants/local_storage';

function createReducer(initialState, handlers) {
  return (state = initialState, action = {}) => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}

const initialState = {isAuthenticated: false};
const {TOKEN_KEY} = LocalStorageConstants;

export default createReducer(initialState, {
  [ActionTypes.Auth.LOGIN_FAILURE]: state => {
    localStorage.removeItem(TOKEN_KEY);
    return Object.assign({}, state, {isAuthenticated: false});
  },

  [ActionTypes.Auth.LOGIN_SUCCESS]: (state, {payload}) => {
    // TODO: Ugh. Let's just cookie / session this mother fucker.
    localStorage.setItem(TOKEN_KEY, payload.token);
    return Object.assign({}, state, {isAuthenticated: true});
  }
});
