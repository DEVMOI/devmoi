export const toggleSidebar = (payload) => (dispatch) => {
  dispatch({ type: 'SET_SIDEBAR_STATUS', payload });
};
