import 'isomorphic-fetch';
import Immutable from 'immutable';
import React from 'react';
import Root from 'containers/root';
import apiMiddleware from 'middleware/api';
import reducers from 'reducers';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore, compose} from 'redux';
import {combineReducers} from 'redux-immutablejs';
import {render} from 'react-dom';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = applyMiddleware(thunk, apiMiddleware);
const reducer = combineReducers(reducers);

const defaultState = Immutable.Map();
const initialState = reducer(defaultState);

const store = createStore(reducer, initialState, composeEnhancers(middleware));

render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('app')
);
