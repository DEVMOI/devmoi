import MetaMaskOnboarding from '@metamask/onboarding';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';

/**
 * Detects the window.ethereum var
 */
const provider = async () => await detectEthereumProvider();
/**
 *  Handles the Web3.js Provider.
 *  If it detects MetaMask then it will use window.ethereum as the Provider.
 *  If MetaMask isn't detected then the INFURA_API will be used to as a provider.
 */

const initWeb3 = async () => {
  try {
    if (await provider()) {
      window.web3 = new Web3(window.ethereum);
      return true;
    } else {
      window.web3 = new Web3(
        new Web3.providers.HttpProvider(process.env.INFURA_API)
      );
      return true;
    }
  } catch (error) {
    console.error('initWeb3()', error);
    return false;
  }
};
/**
 * Handles Onboarding User When connecting to metamask
 * @param {*} params
 */
const onboardUser = async (params) => {
  try {
    const onboarding = new MetaMaskOnboarding();
    (await provider())
      ? onboarding.stopOnboarding()
      : onboarding.startOnboarding();
  } catch (error) {
    console.log('onboardUser: ', error);
  }
};

//
export const login = (props) => async (dispatch) => {
  try {
    web3.currentProvider.enable().then(() => console.log('Get ETH Connection'));
    dispatch({ type: 'SET_AUTH_STATUS', payload: true });
  } catch (error) {
    await console.log('Login: ', error);
  }
};
//
export const isAuth = (props) => async (dispatch, getState) => {
  try {
    const { session } = getState();
    initWeb3();
    if ((await provider()) !== null) {
      
      let address = await web3.eth.getAccounts()
      web3.eth.defaultAccount = address[0];
      

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
        .then((res) => dispatch(setBalance(web3.utils.fromWei(res, 'ether'))))
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
