import types from '../actions/types';
const {
  SET_USERMANAGEMENT_TEXT,
  TOGGLE_DISABLE,
  GET_ALL_USERS,
  EMAIL_INVITE_RESPONSE,
  USER_DELETE_RESPONSE,
  RESET_PASS_RESPONSE,
} = types;

const INITIAL_STATE = {
  name: '',
  disableName: true,
  email: '',
  inviteResponse: {}, // TODO: Can probably convert to a generic response object
  deleteResponse: {},
  resetResponse: {},
  disableEmail: true,
  password: '',
  confirmPassword: '',
  newPassword: '',
  disablePassword: true,
  role: '',
  allUsers: [],
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return { ...state, allUsers: action.payload };
    case TOGGLE_DISABLE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case SET_USERMANAGEMENT_TEXT:
      return { ...state, [action.payload.prop]: action.payload.value };
    case EMAIL_INVITE_RESPONSE:
      return { ...state, inviteResponse: action.payload };
    case USER_DELETE_RESPONSE:
      return { ...state, deleteResponse: action.payload };
    case RESET_PASS_RESPONSE:
      return { ...state, resetResponse: action.payload };
    default:
      return state;
  }
};
