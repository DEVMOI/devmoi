import types from './types';
const axios = require('axios');
import bcrypt from 'bcryptjs';
// const bcrypt = require('bcryptjs');
import { loadUser } from './authActions';
const {
  SET_USERMANAGEMENT_TEXT,
  TOGGLE_DISABLE,
  GET_ALL_USERS,
  SET_EMAIL,
  SET_NAME,
  SET_PASSWORD,
  SET_ROLE,
  EMAIL_INVITE_STARTED,
  EMAIL_INVITE_RESPONSE,
  USER_DELETE_RESPONSE,
  RESET_PASS_RESPONSE,
  SET_ERRORS,
} = types;

/**
 * @function usermanagementOnChange
 * @description Handles Values being changed by User
 * @param {object} payload - holds the Prop and Value being manipulated in the State
 */
export const usermanagementOnChange = (payload) => (dispatch) => {
  dispatch({
    type: SET_USERMANAGEMENT_TEXT,
    payload: {
      prop: payload.prop,
      value: payload.value,
    },
  });
};

/**
 * @function usermanagementToggleDisable
 * @description Toggles the Password Section to allow it to be change or disable it
 * @param {string} prop - What Item in the UserManagement Reducer that Needs to be  Changed
 * @param {boolean} value - The Value being Added to the Redux State
 */
export const usermanagementToggleDisable = ({ prop, value }) => (dispatch) => {
  let val;
  if (value === true) {
    val = false;
  } else {
    val = true;
  }
  dispatch({
    type: TOGGLE_DISABLE,
    payload: { prop, value: val },
  });
};

export const usermanagementGetUsers = (callback) => (dispatch) => {
  axios
    .get('/api/auth/allusers')
    .then((res) => {
      let payload = res.data;
      dispatch({
        type: GET_ALL_USERS,
        payload,
      });
    })
    .then(() => {
      if (typeof callback === 'function') {
        callback();
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

//TODO: For each update action, need to check if the
//      user being updated is the current user. If so
//      auth reducer needs to be updated as well
export const usermanagementUpdateName = (userId, userName, callback) => (
  dispatch,
  getState
) => {
  const { authReducer } = getState();

  if (userName.length <= 0) {
    alert('Cannot leave Name Blank');
    return;
  }
  axios
    .put(`/api/auth/update/name`, {
      id: userId,
      name: userName,
    })
    .then(() => {
      // If current user is being updated
      if (userId === authReducer.id) {
        dispatch({
          type: SET_NAME,
          payload: userName,
        });
      }
    })
    .then(() => {
      if (typeof callback === 'function') {
        callback();
      }

      console.log('successful update');
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
};

export const usermanagementUpdateEmail = (userId, userEmail, callback) => (
  dispatch,
  getState
) => {
  if (userEmail.length <= 0) {
    alert('Cannot leave Email Blank');
    return;
  }
  axios
    .put(`/api/auth/update/email`, {
      id: userId,
      email: userEmail,
    })
    .then(() => {
      const { authReducer } = getState();

      // If current user is being updated
      if (userId === authReducer.id) {
        dispatch({
          type: SET_EMAIL,
          payload: userEmail,
        });
      }
    })
    .then(() => {
      if (typeof callback === 'function') {
        callback();
      }
      console.log('successful update');
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({ type: SET_ERRORS, payload: err.response });
    });
};

// Send Email to user who has requested a password reset
export const usermanagementSendResetPass = (emailRec, callback) => async (
  dispatch
) => {
  try {
    // Send request to route
    const res = await axios
      .post('/api/auth/reset', {
        email: emailRec,
      })
      .then((res) => {
        // Dispatch Success
        dispatch({
          type: RESET_PASS_RESPONSE,
          payload: res,
        });
      })
      .then(() => {
        callback();
      })
      .catch((err) => {
        dispatch({ type: SET_ERRORS, payload: err.response });
      });
  } catch (err) {
    dispatch({ type: SET_ERRORS, payload: err.response });
  }
};

export const usermanagementUpdatePassword = (email, newPassword, callback) => (
  dispatch
) => {
  try {
    axios
      .put(`/api/auth/update/password`, {
        email,
        newPassword,
      })
      .then((res) => {
        dispatch({
          type: RESET_PASS_RESPONSE,
          payload: res,
        });
      })
      .then(() => {
        callback();
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({ type: SET_ERRORS, payload: err.response });
      });
  } catch (err) {
    console.log(err.response);
    dispatch({ type: SET_ERRORS, payload: err.response });
  }
};

export const usermanagementUpdateRole = (id, newRoles, callback) => (
  dispatch,
  getState
) => {
  axios
    .put(`/api/auth/update/role`, {
      id: id,
      role: newRoles,
    })
    .then(() => {
      const { authReducer } = getState();

      // If current user is being updated
      if (id === authReducer.id) {
        dispatch({
          type: SET_ROLE,
          payload: newRoles,
        });
      }
    })
    .then(() => {
      console.log('successful update');
    })
    .then(() => {
      if (typeof callback === 'function') {
        callback();
      }
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
};

export const usermanagementInviteUser = (
  emailRec,
  roleRec,
  sender_id
) => async (dispatch) => {
  try {
    // Send request to route
    const res = await axios
      .post('/api/auth/inv', {
        email: emailRec,
        role: roleRec,
        senderId: sender_id,
      })
      .then((res) => {
        // Dispatch Success
        dispatch({
          type: EMAIL_INVITE_RESPONSE,
          payload: res,
        });
      })
      .catch((err) => {
        dispatch({ type: SET_ERRORS, payload: err.response });
      });
  } catch (err) {
    dispatch({ type: SET_ERRORS, payload: err.response });
  }
};

// Invite User to the overall system
export const inviteUserStarted = () => {
  return { type: EMAIL_INVITE_STARTED };
};

export const inviteUserFailed = (error) => {
  return { type: SET_ERRORS, payload: error };
};

export const usermanagementAddUser = () => (dispatch) => {};

export const usermanagementDeleteUser = (id, callback) => (dispatch) => {
  try {
    // Remove User
    axios
      .delete(`/api/auth/removeuser/${id}`)
      .then(
        // Remove associated emails
        (res) => {
          dispatch(inviteCleanup(res.data.msg.email));
        }
      )
      .then(
        // Execute passed in callback if present
        () => {
          if (typeof callback === 'function') {
            callback();
          }
        }
      )
      .catch((err) => {
        console.log(err.response);
        dispatch({ type: SET_ERRORS, payload: err.response });
      });
  } catch (err) {
    dispatch({ type: SET_ERRORS, payload: err.response });
  }
};

// Called to remove invitations for a
// user after successful registration
export const inviteCleanup = (email) => (dispatch) => {
  // Axios request to delete invitations for given email
  try {
    axios
      .delete('/api/auth/inv/', { data: { email: email } })
      .then((res) => {
        dispatch({ type: USER_DELETE_RESPONSE, payload: res });
      })
      .catch((err) => {
        dispatch({ type: SET_ERRORS, payload: err.response });
      });
  } catch (err) {
    dispatch({ type: SET_ERRORS, payload: err.response });
  }
};
