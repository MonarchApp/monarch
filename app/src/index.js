import 'isomorphic-fetch';
import * as reducers from 'reducers';
import React from 'react';
import apiMiddleware from 'middleware/api';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {combineReducers} from 'redux-immutablejs';
import {createStore, applyMiddleware} from 'redux';
import {render} from 'react-dom';

import 'theme/main.scss';
import Root from 'containers/root';

const store = createStore(
  combineReducers(reducers),
  applyMiddleware(thunk)(promiseMiddleware)(apiMiddleware)
);

render(
  <Provider store={store}>
    <div>
      <Root />
    </div>
  </Provider>,
  document.getElementById('app')
);
