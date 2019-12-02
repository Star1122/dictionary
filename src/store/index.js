import { createStore, applyMiddleware, compose } from 'redux';
import * as History from 'history';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import { verifyAuth } from './auth/actions';

const initialState = {};
const enhancers = [];

export const history = History.createBrowserHistory();

if (process.env.NODE_ENV === 'development') {
  const { devToolsExtension } = window;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(thunk),
  ...enhancers,
);

const store = createStore(rootReducer(history), initialState, composedEnhancers);
store.dispatch(verifyAuth());

export default store;
