import 'isomorphic-fetch';
import reducers from 'reducers';
import Immutable from 'immutable';
import React from 'react';
import apiMiddleware from 'middleware/api';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {combineReducers} from 'redux-immutablejs';
import {applyMiddleware, createStore, compose} from 'redux';
import {render} from 'react-dom';

import 'theme/main.scss';
import Root from 'containers/root';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = applyMiddleware(thunk, apiMiddleware);
const reducer = combineReducers(reducers);

const defaultState = Immutable.Map();
const initialState = reducer(defaultState);

const store = createStore(reducer, initialState, composeEnhancers(middleware));

render(
  <Provider store={store}>
    <div>
      <Root />
    </div>
  </Provider>,
  document.getElementById('app')
);
