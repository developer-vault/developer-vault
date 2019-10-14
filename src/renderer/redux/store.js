import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux';
import { createLogger } from 'redux-logger';
import reduxThunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { reducer as notificationsReducer } from 'reapop';

import appReducers from './stores/app/reducers';
import intlReducer from './stores/intl/reducer';
import nodesReducer from './stores/nodes/reducer';

import makePersistStateMiddleware from './middlewares/persistState';

const reducers = combineReducers({
  app: appReducers,
  nodes: nodesReducer,
  // 3rd party reducers
  intl: intlReducer,
  notifications: notificationsReducer(),
});

const persistStateMiddleware = makePersistStateMiddleware();

const middlewares = [
  reduxThunkMiddleware,
  persistStateMiddleware,
];

if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  middlewares.push(createLogger({
    collapsed: true,
    diff: true,
    duration: true,
  }));
}

const composeMiddlewares = process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test'
  ? composeWithDevTools
  : compose;

const store = createStore(
  reducers,
  composeMiddlewares(applyMiddleware(...middlewares)),
);

export default store;
