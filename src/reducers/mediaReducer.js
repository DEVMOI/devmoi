import types from '../actions/types';

const { GET_MEDIA_SUCCESS } = types;

const INITIAL_STATE = { medias: [] };

export default function mediaReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_MEDIA_SUCCESS:
      return {
        ...state,
        medias: action.payload,
      };
      break;
    default:
      return state;
  }
}
