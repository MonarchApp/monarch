import apiMiddleware from 'middleware/api';
import configureStore from 'redux-mock-store';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';

export const getMockStore = (additionalMiddleware = []) => configureStore([
  ...additionalMiddleware,
  thunk,
  promiseMiddleware,
  apiMiddleware
]);
