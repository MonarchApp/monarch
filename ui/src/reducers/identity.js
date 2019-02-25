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

const initialState = {authenticated: false};
const {TOKEN_KEY} = LocalStorageConstants;

export default createReducer(initialState, {
  [ActionTypes.Identity.LOGIN_FAILURE]: state => {
    // TODO: Ugh. Let's just cookie / session this mother fucker. Or
    // move it into a subscription to make reducer side-effect free.
    localStorage.removeItem(TOKEN_KEY);
    return Object.assign({}, state, {authenticated: false});
  },

  [ActionTypes.Identity.LOGIN_SUCCESS]: (state, {payload}) => {
    // TODO: Move into subscription to make reducer side-effect free.
    localStorage.setItem(TOKEN_KEY, payload.token);
    return Object.assign({}, state, {authenticated: true});
  }
});
