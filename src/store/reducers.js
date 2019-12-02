import { combineReducers } from 'redux';

import auth from './auth/reducer';
import dictionaries from './dictionaries/reducer';

export default () => combineReducers({
  auth,
  dictionaries,
});
