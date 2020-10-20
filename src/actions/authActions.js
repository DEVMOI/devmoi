import MetaMaskOnboarding from '@metamask/onboarding';

// this function detects most providers injected at window.ethereum
import detectEthereumProvider from '@metamask/detect-provider';

// import { checkCookie, delCookie, getCookie } from 'helpers/tokenHelp';

// import axios from'axios'

export const moiEthStatus = (props) => async (dispatch) => {
  //Have to check the ethereum binding on the window object to see if it's installed

  const provider = await detectEthereumProvider();
  if (provider !== window.ethereum) {
    console.error('Do you have multiple wallets installed?');
    dispatch({
      type: 'SET_ETH_STATUS',
      payload: false,
    });
  } else {
    dispatch({
      type: 'SET_ETH_STATUS',
      payload: provider,
    });
  }
};
//
export const login = (props) => async (dispatch) => {
  try {
    await ethereum.request(
      {
        method: 'eth_requestAccounts',
      },
      (newAccounts) => {
        let handleSignup = (publicAddress) =>
          fetch(`/auths/post`, {
            body: JSON.stringify({ publicAddress }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          }).then((response) => response.json());

        let handleSignMessage = ({ publicAddress, nonce }) => {
          return new Promise((resolve, reject) =>
            web3.personal.sign(
              web3.fromUtf8(`I am signing my one-time nonce: ${nonce}`),
              publicAddress,
              (err, signature) => {
                if (err) return reject(err);
                return resolve({ publicAddress, signature });
              }
            )
          );
        };

        let handleAuthenticate = ({ publicAddress, signature }) =>
          fetch(`/auth`, {
            body: JSON.stringify({ publicAddress, signature }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          }).then((response) => response.json());

        dispatch(setAddress(newAccounts));
        fetch(`/auth/post`, { newAccounts })
          .then((response) => response.json())
          // If yes, retrieve it. If no, create it.
          .then((users) =>
            users.length ? users[0] : this.handleSignup(publicAddress)
          )
          // Popup MetaMask confirmation modal to sign message
          .then(this.handleSignMessage)
          // Send signature to back end on the /auth route
          .then(this.handleAuthenticate);
      }
    );

    dispatch({ type: 'SET_AUTH_STATUS', payload: true });
  } catch (error) {
    await console.log('Login: ', error);
  }
};
//
export const isAuth = (props) => async (dispatch, getState) => {
  try {
    const { session } = getState();
    await dispatch(moiEthStatus());

    if (session.eth_status) {
      ethereum
        .request({ method: 'eth_accounts' })
        .then((address) => dispatch(setAddress(address)));
      ethereum
        .request({
          id: 1,
          jsonrpc: '2.0',
          method: 'eth_getBalance',
          params: [session.address[0], 'latest'],
        })
        .then((res) => {
          let bal;
          bal = parseInt(res, 16);
          bal = bal * Math.pow(10, -18);
          dispatch(setBalance(bal));
        })
        .catch((error) => {
          if (error.code === 4001) {
            // EIP-1193 userRejectedRequest error
            console.log('Please connect to MetaMask.');
          } else {
            console.error(error);
          }
        });
      await dispatch(setChainId(ethereum.chainId));
      await ethereum.on('chainChanged', (chainId) => {
        window.location.reload();
      });
      await ethereum.on('accountsChanged', (newAccounts) =>
        dispatch(setAddress(newAccounts))
      );
      return async () => {
        await ethereum.off('accountsChanged', (newAccounts) => {
          dispatch(setAddress(newAccounts));
        });
      };
    }
  } catch (error) {
    console.log('isAuth Error:', error);
  }
};
//

export const createMToken = (props, MODE) => (dispatch) => {
  dispatch({ type: 'SET_TOKEN', payload: 'SUCCESS' });
};
// Setters
export const setAddress = (addr) => (dispatch) => {
  if (addr == null) addr = [];
  dispatch({
    type: 'SET_ADDRESS',
    payload: addr,
  });
};
export const setChainId = (payload) => (dispatch) => {
  dispatch({
    type: 'SET_CHAINID',
    payload,
  });
};

export const setBalance = (payload) => (dispatch) =>
  dispatch({ type: 'SET_BALANCE', payload });
