import { REHYDRATE } from 'redux-persist';
import types from '../actions/types';

const INITIAL_STATE = {
  eth_status: false,
  isLoading: false,
  id: '',
  address: null,
  name: '',
  email: '',
  password: '',
  role: [],
  dateCreated: null,
  isAuthenticated: false,
  userById: null,
};

export default function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_ETH_STATUS':
      return { ...state, eth_status: action.payload };
    case 'SET_ADDRESS':
      return { ...state, address: action.payload };
    default:
      return state;
  }
}
