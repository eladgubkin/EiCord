import {
  GET_FRIEND_ID,
  CLEAR_FRIEND_ID,
  GET_MESSAGES,
  INIT_SOCKET
} from '../actions/types';

const initialState = {
  friendID: null,
  messages: null,
  socket: null
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

    case GET_MESSAGES:
      return {
        ...state,
        messages: action.payload
      };

    case INIT_SOCKET:
      return {
        ...state,
        socket: action.payload
      };

    default:
      return state;
  }
}
