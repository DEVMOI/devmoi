import { combineReducers } from 'redux';

import session from './session';
import errorReducer from './errorReducer';

const rootReducer = combineReducers({
  session,
  errorReducer,
});

export default rootReducer;
