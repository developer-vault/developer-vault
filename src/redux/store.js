import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import ReduxThunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducers = combineReducers({});

const middlewares = [ReduxThunkMiddleware];

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
