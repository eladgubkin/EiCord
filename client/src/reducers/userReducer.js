import {
  GET_USER,
  USER_LOADING,
  CLEAR_CURRENT_USER,
  UPDATE_USER
} from '../actions/types';

const initialState = {
  user: null,
  loading: false
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

    default:
      return state;
  }
}
