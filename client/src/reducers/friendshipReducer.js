import {
  GET_ALL_FRIENDSHIPS,
  SEND_FRIEND_REQUEST,
  CONFIRM_FRIEND_REQUEST
} from '../actions/types';

const initialState = {
  friendships: null,
  loading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_FRIENDSHIPS:
      return {
        ...state,
        friendships: action.payload,
        loading: false
      };

    case SEND_FRIEND_REQUEST:
      return {
        ...state,
        success: action.payload,
        loading: false
      };

    case CONFIRM_FRIEND_REQUEST:
      return {
        ...state,
        success: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
