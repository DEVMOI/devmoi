import { combineReducers } from 'redux';

import authReducer from './authReducer';
import errorReducer from './errorReducer';
import usermanagementReducer from './usermanagementReducer';
import mediaReducer from './mediaReducer';
import pageReducer from './pageReducer';

const rootReducer = combineReducers({
  authReducer,

  usermanagementReducer,

  errorReducer,

  pageReducer,
});

export default rootReducer;
