import ActionTypes from 'constants/actions';
import ApiPaths from 'constants/api_paths';

const Actions = {};

Actions.login = (email, password) => ({
  type: ActionTypes.Api.CALL,
  payload: {
    endpoint: ApiPaths.LOGIN,
    options: {
      body: {email, password},
      method: 'POST'
    },
    types: [
      ActionTypes.Identity.LOGIN_REQUEST,
      ActionTypes.Identity.LOGIN_SUCCESS,
      ActionTypes.Identity.LOGIN_FAILURE
    ]
  }
});

export default Actions;
