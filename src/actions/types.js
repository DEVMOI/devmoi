//Assessment Actions
const types = {
  //Task Actions
  FETCH_PENDING_TASKS: 'fetch_pending_tasks',

  // Media Actions
  GET_MEDIA: 'get_media',
  GET_MEDIA_STARTED: 'get_media_started',
  GET_MEDIA_SUCCESS: 'get_media_success',
  GET_MEDIA_FAILURE: 'get_media_failure',

  //User Information Actions
  SET_NAME: 'set_name',
  SET_EMAIL: 'set_email',
  SET_USERNAME: 'set_username',
  SET_PASSWORD: 'set_password',
  SET_ROLE: 'set_role',
  GET_EMAIL: 'get_email',
  GET_USERNAME: 'get_username',
  GET_PASSWORD: 'get_password',
  GET_ROLE: 'get_role',
  GET_USER_BY_ID: 'get_user_by_id',
  GET_ALL_USERS: 'get_all_users',
  SET_USERMANAGEMENT_TEXT: 'set_usermanagement_text',
  TOGGLE_DISABLE: 'toggle_disable',
  USER_DELETE_RESPONSE: 'user_delete_response',

  //Register Actions
  REGISTER_USER: 'register_user',
  REGISTER_STARTED: 'register_started',
  REGISTER_FAILED: 'register_failed',
  REGISTER_SUCCESS: 'register_success',
  USER_LOADED: 'user_loaded',

  //Login Actions
  LOGIN_USER: 'login_user',
  LOGIN_STARTED: 'login_started',
  LOGIN_FAILED: 'login_failed',
  LOGIN_SUCCESS: 'login_success',
  LOGOUT: 'logout',

  //Email Actions
  EMAIL_INVITE_STARTED: 'email_invite_started',
  EMAIL_INVITE_SUCCESS: 'email_invite_success',
  EMAIL_INVITE_RESPONSE: 'email_invite_response',

  // Reset Password Actions
  RESET_PASS_RESPONSE: 'reset_pass_response',

  //Filter Actions
  UPDATE_FILTERS: 'update_filters',

  //Error Actions
  SET_ERRORS: 'set_errors',
  CLEAR_ERRORS: 'clear_errors',

  // Page Actions
  GET_PAGE_DATA: 'GET_PAGE_DATA',
};

export default types;
