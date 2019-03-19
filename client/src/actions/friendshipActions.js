import axios from 'axios';
import {
  GET_ALL_FRIENDSHIPS,
  SEND_FRIEND_REQUEST,
  CONFIRM_FRIEND_REQUEST,
  DECLINE_FRIEND_REQUEST
} from './types';

// Get all friendships
export const getAllFriendships = () => dispatch => {
  return axios
    .get('/api/friendships/all')
    .then(res => {
      dispatch({
        type: GET_ALL_FRIENDSHIPS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ALL_FRIENDSHIPS,
        payload: {}
      })
    );
};

export const sendFriendRequest = accepterID => dispatch => {
  return axios
    .post('api/friendships/request', { accepterID })
    .then(res => {
      dispatch({
        type: SEND_FRIEND_REQUEST,
        payload: res.data.success
      });
    })
    .catch(err =>
      dispatch({
        type: SEND_FRIEND_REQUEST,
        payload: err.response.data
      })
    );
};

export const confirmFriendRequest = requesterID => dispatch => {
  return axios
    .post('api/friendships/confirm', { requesterID })
    .then(res => {
      dispatch({
        type: CONFIRM_FRIEND_REQUEST,
        payload: res.data.confirmSuccess
      });
    })
    .catch(err =>
      dispatch({
        type: CONFIRM_FRIEND_REQUEST,
        payload: err.response.data
      })
    );
};

export const DeclineFriendRequest = requesterID => dispatch => {
  return axios
    .post('api/friendships/decline', { requesterID })
    .then(res => {
      dispatch({
        type: DECLINE_FRIEND_REQUEST,
        payload: res.data.declineSuccess
      });
    })
    .catch(err =>
      dispatch({
        type: DECLINE_FRIEND_REQUEST,
        payload: err.response.data
      })
    );
};
