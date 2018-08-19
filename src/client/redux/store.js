import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import apiMiddleware from './apiMiddleware';
import reducers from './reducers/root';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = process.env.NODE_ENV === 'production'
  ? [thunk, apiMiddleware]
  : [thunk, apiMiddleware, createLogger()];

const makeStore = () => createStore(
  reducers,
  composeEnhancer(
    applyMiddleware(...middleware),
  ),
);

export default makeStore;
