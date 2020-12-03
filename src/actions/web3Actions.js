import MetaMaskOnboarding from '@metamask/onboarding';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import Box from '3box';
import { getProfile } from './sessionActions';
/**
 * Detects the window.ethereum var
 */
const _provider = async () => {
  try {
    await detectEthereumProvider();
  } catch (error) {
    return false;
  }
  return true;
};
/**
 *  Handles the Web3.js Provider.
 *  If it detects MetaMask then it will use window.ethereum as the Provider.
 *  If MetaMask isn't detected then the INFURA_API will be used to as a provider.
 */

const _isMetaMask = async () => {
  try {
    ethereum.isMetaMask;
  } catch (error) {
    console.group();
    console.warn('isMetaMask: Ethereum Not Detected');
    console.warn('To Enjoy the full Experience');
    console.warn('Please visit: https://MetaMask.io ❤');
    console.groupEnd();
    return false;
  }
  return true;
};

const initBox = async (provider) => {
  window.box = await Box.create(provider);
};

const auth3Box = async (addr) => {
  try {
    await Box.openBox(addr, window.web3.currentProvider);
    if (window.box !== undefined)
      await window.box.auth([process.env.SPACES], {
        address: addr,
      });
    if (window.box !== undefined) {
      const space = await box.openSpace(process.env.SPACES);
      await space.syncDone;
    }
  } catch (error) {
    console.log('auth3Box', error);
  }
};

export const initWeb3 = () => async (dispatch) => {
  try {
    if (window.ethereum !== undefined) {
      ethereum.autoRefreshOnsNetworkChange = false;
      window.web3 = new Web3(window.ethereum);
      initBox(window.ethereum);
      return true;
    } else {
      window.web3 = new Web3(
        new Web3.providers.HttpProvider(process.env.INFURA_API)
      );
      initBox(process.env.INFURA_API);

      return true;
    }
  } catch (error) {
    return false;
  }
};
//

export const login = (props) => async (dispatch, getState) => {
  try {
    let ethereumProvider = await web3.currentProvider;
    ethereumProvider.enable();
    dispatch(getAddress());

    dispatch({ type: 'SET_AUTH_STATUS', payload: true });
  } catch (error) {
    await console.log('Login(): ', error);
  }
};
//
export const getAddress = () => async (dispatch) => {
  try {
    let address = await web3.eth.getAccounts();
    if (address) {
      web3.eth.defaultAccount = await address[0];

      dispatch(setAddress(address[0]));
    }
  } catch (error) {
    console.error('getAddress():', error);
  }
};
//

//
export const getBalance = (addr) => async (dispatch) => {
  try {
    await web3.eth
      .getBalance(addr)
      .then((res) => {
        dispatch(setBalance(web3.utils.fromWei(res, 'ether')));
      })
      .catch((error) => {
        if (error.code === 4001) {
          // EIP-1193 userRejectedRequest error
          console.log('Please connect to MetaMask.');
        } else {
          console.error(error);
        }
      });
  } catch (error) {
    console.error('getBalance():', error);
  }
};
//
const getNetwork = () => async (dispatch) => {
  await web3.eth.net
    .getNetworkType()
    .then((res) => dispatch(setChainId(res)))
    .catch((err) => {
      console.log('getNetwork', err);
    });
};
//
async function watchChain() {
  try {
    await ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    });
  } catch (error) {
    console.log('watchChain()', error);
  }
}
//
export const init = (props) => async (dispatch, getState) => {
  try {
    const { session } = getState();
    await dispatch(initWeb3());
    await dispatch(getNetwork());
    await dispatch(getAddress());

    if (window.ethereum !== undefined) {
      await watchChain();
      let address = await web3.eth.getAccounts();
      if (address !== null && address !== undefined) {
        await auth3Box(await address[0]);

        await dispatch(getBalance(await address[0]));
        await dispatch(getProfile(await address[0]));
      }
      await ethereum.on('accountsChanged', async (newAccounts) => {
        await dispatch(setAddress(newAccounts));
        let address = await web3.eth.getAccounts();
        if (address !== null && address !== undefined) {
          await auth3Box(await address[0]);
          await dispatch(getBalance(await address[0]));
          await dispatch(getProfile(await address[0]));
        }
      });
    }
  } catch (error) {
    console.error('init():', error);
  }
};
//

// Setters
export const setAddress = (addr) => async (dispatch) => {
  try {
    if (addr == null) addr = [];

    dispatch({
      type: 'SET_ADDRESS',
      payload: addr,
    });
  } catch (error) {
    console.log(error);
  }
};
export const setChainId = (payload) => (dispatch) => {
  dispatch({
    type: 'SET_CHAINID',
    payload,
  });
};

export const setBalance = (payload) => (dispatch) =>
  dispatch({ type: 'SET_BALANCE', payload });
