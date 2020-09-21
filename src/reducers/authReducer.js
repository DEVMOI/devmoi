import { REHYDRATE } from 'redux-persist';
import types from '../actions/types';
const {
  SET_NAME,
  SET_EMAIL,
  SET_USERNAME,
  SET_PASSWORD,
  SET_ROLE,
  LOGIN_USER,
  LOGIN_STARTED,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_USER,
  REGISTER_STARTED,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  USER_LOADED,
  GET_USER_BY_ID,
} = types;

const INITIAL_STATE = {
  isLoading: false,
  id: '',
  name: '',
  email: '',
  password: '',
  role: [],
  dateCreated: null,
  isAuthenticated: false,
  userById: null,
};

export default function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_NAME:
      return { ...state, name: action.payload };
    case SET_EMAIL:
      return { ...state, email: action.payload };
    case SET_USERNAME:
      return { ...state, username: action.payload };
    case SET_PASSWORD:
      return { ...state, password: action.payload };
    case SET_ROLE:
      return { ...state, role: action.payload };
    case GET_USER_BY_ID:
      return {
        ...state,
        userById: action.payload,
      };
    case LOGIN_STARTED:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_USER:
      return {
        ...state,
      };
    case LOGIN_SUCCESS:
    case LOGOUT:
      return {
        ...state,
        isLoading: false,
        id: '',
        name: '',
        email: '',
        password: '',
        role: [],
        dateCreated: null,
        isAuthenticated: false,
      };
    case REGISTER_STARTED:
      return { ...state, isLoading: true };
    case REGISTER_USER:
      return {
        ...state,
        id: action.payload._id,
        name: action.payload.name,
        email: action.payload.email,
        role: action.payload.role,
        dateCreated: action.payload.dateCreated,
      };
    case REGISTER_SUCCESS:
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        id: action.payload._id,
        name: action.payload.name,
        email: action.payload.email,
        role: action.payload.role,
        dateCreated: action.payload.dateCreated,
        password: action.payload.password,
      };
    default:
      return state;
  }
}
