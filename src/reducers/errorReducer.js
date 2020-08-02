import types from '../actions/types';

const { SET_ERRORS, CLEAR_ERRORS } = types;

const INITIAL_STATE = {
  errors: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ERRORS:
      return { ...state, errors: action.payload };
    case CLEAR_ERRORS:
      return { ...state, errors: {} };
    default:
      return state;
  }
};
