import ActionTypes from 'constants/actions';
import {normalize} from 'normalizr';

const callApi = async (endpoint, options, schema) => {
  const response = await fetch(endpoint, options);

  if (!response.ok) return Promise.reject(response.error());

  let json = await response.json();
  if (schema) json = normalize(json, schema);

  return json;
};

export default () => next => async action => {
  if (action.type !== ActionTypes.Api.CALL) return next(action);

  const {endpoint, options, schema, types} = action.payload;
  const [requestType, successType, failureType] = types;

  const actionWith = data => {
    const updatedAction = Object.assign({}, action, data);
    delete updatedAction[ActionTypes.Api.CALL];
    return updatedAction;
  };

  next(actionWith({type: requestType}));

  try {
    next(actionWith({
      payload: await callApi(endpoint, options, schema),
      type: successType
    }));
  } catch (error) {
    next(actionWith({error: error.message, type: failureType}));
  }
};
