import types from './types';
const axios = require('axios');
import Router from 'next/router';

import { inviteCleanup } from '../actions';

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
  SET_ERRORS,
  CLEAR_ERRORS,
  GET_USER_BY_ID,
} = types;

import setAuthToken from '../util/setAuthToken';

// Setters
export const setName = (name) => {
  return { type: SET_NAME, payload: name };
};
export const setEmail = (email) => {
  return { type: SET_EMAIL, payload: email };
};

export const setUsername = (username) => {
  return { type: SET_USERNAME, payload: username };
};

export const setPassword = (password) => {
  return { type: SET_PASSWORD, payload: password };
};

export const setRole = (role) => {
  return { type: SET_ROLE, payload: role };
};

// Getters
export const getUserByID = (userId) => async (dispatch) => {
  try {
    await axios
      .get(`/api/auth/user_by_id/${userId}`)
      .then((res) => {
        dispatch({
          type: GET_USER_BY_ID,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log('error in get user by id axios: %s', err.message);
      });
  } catch (err) {
    console.log(`Error in getting user by id action: ${err}`);
  }
};

// Register Actions
export const registerSuccess = () => {
  return { type: REGISTER_SUCCESS };
};

export const registerStarted = () => {
  return { type: REGISTER_STARTED };
};

export const registerFailure = (error) => {
  return { type: SET_ERRORS, payload: error };
};

// Load User
export const loadUser = (token) => async (dispatch) => {
  if (token) {
    setAuthToken(token);
  }
  
  try {
    await axios.get('/api/auth').then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })   
  } catch (err) {
    dispatch({
      type: LOGIN_FAILED,
    });
  }
};

// Register User Action Creator
export const registerUser = () => async (dispatch, getState) => {
  // Access Auth Reducer State and Post
  try {
    const { authReducer } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    let User = {
      name: authReducer.name,
      email: authReducer.email,
      password: authReducer.password,
      role: authReducer.role,
    };

    dispatch(registerStarted());

    // Make axios server request to register user
    const res = await axios
      .post('/api/auth/register', User, config)
      .then((res) => {
        dispatch(loadUser(res.data.token));
      })
      //.then(dispatch(inviteCleanup))
      .then(dispatch(registerSuccess))
      .catch((err) => {
        dispatch({ type: SET_ERRORS, payload: err.response });
      });
  } catch (err) {
    dispatch({ type: SET_ERRORS, payload: err.response });
  }
};

// Login Actions
export const loginStarted = () => {
  return { type: LOGIN_STARTED };
};

export const loginFailure = (error) => {
  return { type: SET_ERRORS, payload: error };
};

export const loginUser = () => async (dispatch, getState) => {
  try {
    const { authReducer } = getState();
    let User = {
      email: authReducer.email,
      password: authReducer.password,
    };
    dispatch(loginStarted());
    await axios
      .post('/api/auth/login', User)
      .then((res) => {
        dispatch(loadUser(res.data.token));
      })
      .then(() => {
        dispatch({
          type: LOGIN_SUCCESS,
        });
      })
      .catch((err) => {
        dispatch({ type: SET_ERRORS, payload: err.response });
      });
  } catch (err) {
    dispatch({ type: SET_ERRORS, payload: err.response });
  }
};

export const isAuth = () => async (dispatch, getState) => {
  try {
    const { authReducer } = getState();
    let isAuth = authReducer.isAuthenticated;

    if (!isAuth) {
      Router.push('/');
    }

    return isAuth;
  } catch (err) {
    dispatch(loginFailure(err.response.data));
  }
};

// Logout User
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
