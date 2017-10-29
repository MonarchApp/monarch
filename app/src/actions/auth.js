import ActionsConstants from 'constants/actions';

const Actions = {};

Actions.loginRequest = () => ({type: ActionsConstants.Auth.LOGIN_REQUEST});

Actions.loginFailure = (error) => ({
  error,
  type: ActionsConstants.Auth.LOGIN_FAILURE
});

Actions.loginSuccess = (token) => ({
  payload: {token},
  type: ActionsConstants.Auth.LOGIN_SUCCESS
});

export default Actions;
