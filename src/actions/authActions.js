import types from './types';
// const axios = require('axios');
// import axios from'axios'
import Router from 'next/router';

import { inviteCleanup } from '../actions';

import setAuthToken from '../util/setAuthToken';

export const isAuth = (props) => async (dispatch, getState) => {
  try {
    const { authReducer } = getState();
    await dispatch(moiEthStatus);
    const { eth_status } = authReducer;
    if (!eth_status) {
      //If it isn't installed we ask the user to click to install it
      await console.log(
        'Click here to install MetaMask, or Use a Eth Browser!'
      );
    } else {
      await ethereum.on('accountsChanged', async () => {
        //If it is installed we change our button text
        await dispatch(setAddress(ethereum.selectedAddress));
      });
    }
  } catch (error) {
    console.log('isAuth Error:', error);
  }
};
//
export const moiEthStatus = (props) => (dispatch) => {
  //Have to check the ethereum binding on the window object to see if it's installed
  const { ethereum } = window;
  dispatch({
    type: 'SET_ETH_STATUS',
    payload: Boolean(ethereum && ethereum.isMetaMask),
  });
};
//
export const login = (props) => async (dispatch) => {
  try {
    await ethereum.request({ method: 'eth_requestAccounts' });
  } catch (error) {
    await console.log('Login: ', error);
  }
};
// Setters
export const setAddress = (addr) => (dispatch) => {
  dispatch({
    type: 'SET_ADDRESS',
    payload: addr,
  });
};
