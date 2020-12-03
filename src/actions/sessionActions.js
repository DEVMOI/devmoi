import Box from '3box';
export const toggleSidebar = (payload) => (dispatch) => {
  dispatch({ type: 'SET_SIDEBAR_STATUS', payload });
};
export const getProfile = (addr) => async (dispatch, getState) => {
  try {
    let { session } = getState();
    let payload = await Box.getProfile(addr || session.address);
    await box.syncDone;
    dispatch({ type: 'SET_PROFILE', payload });
  } catch (error) {
    console.log('getProfile():', error);
  }
};
