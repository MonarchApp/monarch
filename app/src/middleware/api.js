import ActionTypes from 'constants/actions';
import {normalize} from 'normalizr';
import {SubmissionError} from 'redux-form/immutable';
import Bounce from 'bounce';

const shouldValidateAsJoi = ({isForm, hasJoiValidation}, response, {validation}) =>
  response.ok === false &&
    isForm === true &&
    hasJoiValidation === true &&
    validation &&
    validation.keys.length;

const shouldValidateAsForm = ({isForm}, response) => response.ok === false && isForm === true;

const joiErrorRegex = /\[(.+)\]/;

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

  const {endpoint, options, schema, types} = action.payload;
  const [requestType, successType, failureType] = types;

  const actionWith = data => Object.assign({}, action, data);

  next(actionWith({type: requestType}));

  try {
    return next(actionWith({
      payload: await callApi(endpoint, options, schema),
      type: successType
    }));
  } catch (response) {
    Bounce.rethrow(response, 'system');

    const json = await response.json();
    const {message} = json;

    const failAction = next(actionWith({
      error: true,
      payload: new Error(json),
      type: failureType
    }));

    if (shouldValidateAsJoi(action.payload, response, json)) {
      const [, _error] = message.match(joiErrorRegex);
      const error = new SubmissionError(Object.assign({}, {_error},
        json.validation.keys.reduce((errors, formKey) => {
          errors[formKey] = true;
          return errors;
        }, {})
      ));
      return Promise.reject(error);
    }

    if (shouldValidateAsForm(action.payload, response)) {
      return Promise.reject(new SubmissionError({_error: message}));
    }

    return failAction;
  }
};
