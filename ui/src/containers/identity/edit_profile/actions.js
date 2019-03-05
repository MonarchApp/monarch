import ActionTypes from 'constants/actions';
import ApiPaths from 'constants/api_paths';

const Actions = {};

Actions.updateProfile = ({ bio, email, name }) => ({
  type: ActionTypes.Api.CALL,
  payload: {
    endpoint: ApiPaths.IDENTITY.UPDATE_PROFILE,
    options: {
      body: { bio, email, name },
      method: 'PUT'
    },
    types: [
      ActionTypes.Identity.UPDATE_PROFILE_REQUEST,
      ActionTypes.Identity.UPDATE_PROFILE_SUCCESS,
      ActionTypes.Identity.UPDATE_PROFILE_FAILURE
    ]
  }
});

export default Actions;
