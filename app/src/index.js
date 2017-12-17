import React from 'react';
import ReactDOM from 'react-dom';
import apiMiddleware from 'middleware/api';
import promiseMiddleware from 'redux-promise-middleware';
import reducers from 'reducers';
import thunk from 'redux-thunk';
import {combineReducers} from 'redux-immutablejs';
import {createStore, applyMiddleware} from 'redux';

import 'theme/main.scss';
import Root from 'containers/root';

const store = createStore(
  combineReducers(reducers),
  applyMiddleware(thunk)(promiseMiddleware)(apiMiddleware)
);

ReactDOM.render(
  <Provider store={store}><Root /></Provider>,
  document.getElementById('app')
);
