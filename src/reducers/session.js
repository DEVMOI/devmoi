const INITIAL_STATE = {
  eth_status: false,
  isAuth: false,
  isLoading: false,
  token: null,
  chainId: null,
  address: [],
  balance: null,
  showSidebar: true,
};

export default function session(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_AUTH_STATUS':
      return { ...state, isAuth: action.payload };
    case 'SET_ETH_STATUS':
      return { ...state, eth_status: action.payload };
    case 'SET_ADDRESS':
      return { ...state, address: action.payload };
    case 'SET_TOKEN':
      return { ...state, token: action.payload };
    case 'SET_CHAINID':
      return { ...state, chainId: action.payload };
    case 'SET_BALANCE':
      return { ...state, balance: action.payload };
    case 'SET_SIDEBAR_STATUS':
      return { ...state, showSidebar: action.payload };
    default:
      return state;
  }
}
