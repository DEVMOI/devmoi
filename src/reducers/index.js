import { combineReducers } from 'redux';

import authReducer from './authReducer';
import errorReducer from './errorReducer';

const rootReducer = combineReducers({
  authReducer,

  usermanagementReducer,

  errorReducer,

  pageReducer,
});

export default rootReducer;
