import 'isomorphic-fetch';
import React from 'react';
import Root from 'containers/root';
import apiMiddleware from 'middleware/api';
import reducers from 'reducers';
import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { render } from 'react-dom';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = applyMiddleware(thunk, apiMiddleware);
const reducer = combineReducers(reducers);

const defaultState = {};
const initialState = reducer(defaultState);

const store = createStore(reducer, initialState, composeEnhancers(middleware));

render(<Root store={store} />, document.getElementById('app'));
