import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import reduxThunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { intlReducer } from 'react-intl-redux';

import appReducers from './app/reducers';

import makePersistStateMiddleware from './middlewares/persistState';

const reducers = combineReducers({
  app: appReducers,
  intl: intlReducer,
});

const persistStateMiddleware = makePersistStateMiddleware();

const middlewares = [
  reduxThunkMiddleware,
  persistStateMiddleware,
];

if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  middlewares.push(createLogger({ collapsed: true, diff: true, duration: true }));
}

const composedMiddlewares = process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test' ?
  composeWithDevTools(applyMiddleware(...middlewares)) :
  compose(applyMiddleware(...middlewares));

const store = createStore(
  reducers,
  composedMiddlewares,
);

export default store;
