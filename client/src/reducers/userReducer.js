import {
  GET_USER,
  SEARCH_USERS,
  CLEAR_SEARCH_USERS,
  USER_LOADING,
  CLEAR_CURRENT_USER,
  UPDATE_USER,
  GET_FRIENDS_INFO,
  CLEAR_FRIENDS_INFO,
  GET_REQUESTERS_INFO,
  CLEAR_REQUESTERS_INFO,
  GET_ACCEPTERS_INFO,
  CLEAR_ACCEPTERS_INFO,
  GET_USER_BY_ID,
  CLEAR_USER_BY_ID
} from '../actions/types';

const initialState = {
  friends: null,
  requesters: null,
  accepters: null,
  users: null,
  user: null,
  userById: null,
  loading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };

    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false
      };

    case UPDATE_USER:
      return {
        ...state,
        loading: false
      };

    case CLEAR_CURRENT_USER:
      return {
        ...state,
        user: null
      };

    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };

    case CLEAR_SEARCH_USERS:
      return {
        ...state,
        users: null
      };

    case GET_FRIENDS_INFO:
      return {
        ...state,
        friends: action.payload,
        loading: false
      };

    case CLEAR_FRIENDS_INFO:
      return {
        ...state,
        friends: null,
        loading: false
      };

    case GET_REQUESTERS_INFO:
      return {
        ...state,
        requesters: action.payload,
        loading: false
      };

    case CLEAR_REQUESTERS_INFO:
      return {
        ...state,
        requesters: null,
        loading: false
      };
    case GET_ACCEPTERS_INFO:
      return {
        ...state,
        accepters: action.payload,
        loading: false
      };

    case CLEAR_ACCEPTERS_INFO:
      return {
        ...state,
        accepters: null,
        loading: false
      };

    case GET_USER_BY_ID:
      return {
        ...state,
        userById: action.payload
      };

    case CLEAR_USER_BY_ID:
      return {
        ...state,
        userById: null
      };
    default:
      return state;
  }
}
