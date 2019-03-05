import ActionTypes from 'constants/actions';
import { normalize } from 'normalizr';
import Bounce from 'bounce';

const callApi = async (endpoint, options, schema) => {
  const updatedOptions = Object.assign({}, options, {
    body: JSON.stringify(options.body)
  });

  const fetchOptions = Object.assign({}, {
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors'
  }, updatedOptions);

  const response = await fetch(endpoint, fetchOptions);
  if (!response.ok) return Promise.reject(response);

  let json = await response.json();
  if (schema) json = normalize(json, schema);

  return json;
};

export default () => next => async action => {
  if (action.type !== ActionTypes.Api.CALL) return next(action);

  const { endpoint, options, schema, types } = action.payload;
  const [requestType, successType, failureType] = types;

  const actionWith = data => Object.assign({}, action, data);

  next(actionWith({ type: requestType }));

  try {
    return next(actionWith({
      payload: await callApi(endpoint, options, schema),
      type: successType
    }));
  } catch (response) {
    Bounce.rethrow(response, 'system');

    const json = await response.json();
    const failAction = next(actionWith({
      error: true,
      payload: new Error(json),
      type: failureType
    }));

    return failAction;
  }
};
