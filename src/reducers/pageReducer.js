import types from '../actions/types';

const { GET_PAGE_DATA } = types;

const INITIAL_STATE = {
  visibility: true,
  pageData: {},
  thumbNail: '',
};

export default function pageReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_PAGE_VISIBILITY':
      return { ...state, visibility: action.payload };
    case 'SET_PAGE_DATA':
      return { ...state, pageData: action.payload };
    case 'SET_PAGE_THUMBNAIL':
      return { ...state, thumbNail: action.payload };
    case GET_PAGE_DATA:
      return { ...state, pageData: action.payload };
    default:
      return state;
  }
}
