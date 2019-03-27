import { GET_FRIEND_ID, CLEAR_FRIEND_ID } from '../actions/types';

const initialState = {
  friendID: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FRIEND_ID:
      return {
        ...state,
        friendID: action.payload
      };

    case CLEAR_FRIEND_ID:
      return {
        ...state,
        friendID: null
      };

    default:
      return state;
  }
}
