import AuthActions from 'actions/auth';
import ApiPaths from 'constants/api_paths';

const Api = {};

Api.login = (user, password) => async dispatch => {
  dispatch(AuthActions.loginRequest);

  const options = {
    body: {user, password},
    method: 'POST'
  };

  const response = await fetch(ApiPaths.LOGIN, options);

  if (!response.ok) return dispatch(AuthActions.loginFailure, response.error().message);

  const {token} = await response.json();
  dispatch(AuthActions.loginSuccess, token);
};

export default Api;
