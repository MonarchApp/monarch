import ActionTypes from 'constants/actions';
import ApiPaths from 'constants/api_paths';

const Actions = {};

ActionTypes.nextStep = (payload) => ({
  type: ActionTypes.Signup.NEXT_STEP,
  payload
});
