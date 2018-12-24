import ActionTypes from 'constants/actions';
import LocalStorageConstants from 'constants/local_storage';
import createReducer from "./createReducer";

const initialState = {
  email: '',
  password: '',
  step: 0,
  username: ''
};

export default createReducer(initialState, {
  [ActionTypes.Signup.NEXT_STEP]: (state, {payload}) => {
    const step = state.step + 1;
    return Object.assign({}, state, step, payload);
  },
});
