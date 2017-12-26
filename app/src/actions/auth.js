import ActionTypes from 'constants/actions';
import ApiPaths from 'constants/api_paths';

const Actions = {};

Actions.login = (user, password) => ({
  type: ActionTypes.Api.CALL,
  payload: {
    endpoint: ApiPaths.LOGIN,
    options: {
      body: {user, password},
      method: 'POST'
    },
    types: [
      ActionTypes.Auth.LOGIN_REQUEST,
      ActionTypes.Auth.LOGIN_SUCCESS,
      ActionTypes.Auth.LOGIN_FAILURE
    ]
  }
});

export default Actions;
