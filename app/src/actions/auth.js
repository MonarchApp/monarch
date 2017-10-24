import Actions from 'constants/actions';

export const loginRequest = (user, password) => ({
  password,
  type: Actions.Auth.LOGIN_REQUEST,
  user
});

export const loginFailure = (error) => ({
  error,
  type: Actions.Auth.LOGIN_FAILURE
});

export const login = async (user, password) => async dispatch => {
  dispatch(loginRequest, user, password);

  const response = await Promise.resolve(new Response());

  if (!response.ok) return dispatch(loginFailure, response.error().message);
}
