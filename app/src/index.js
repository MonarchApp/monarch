import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import asyncAwait from 'redux-async-await';
import {combineReducers} from 'redux-immutablejs';
import apiMiddleware from 'middleware/api';
import * as reducers from 'reducers';

import 'theme/main.scss';
import Root from 'containers/root';

const store = createStore(
  combineReducers(reducers),
  applyMiddleware(asyncAwait)(apiMiddleware)
);

ReactDOM.render(
  <Provider store={store}><Root /></Provider>,
  document.getElementById('app')
);
