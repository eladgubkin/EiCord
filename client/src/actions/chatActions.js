import { GET_FRIEND_ID, CLEAR_FRIEND_ID } from './types';

export const chatWithUser = friendID => dispatch => {
  return dispatch({
    type: GET_FRIEND_ID,
    payload: friendID
  });
};

export const clearFriendId = () => dispatch => {
  return dispatch({
    type: CLEAR_FRIEND_ID
  });
};
