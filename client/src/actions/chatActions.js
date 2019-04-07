import { GET_FRIEND_ID, CLEAR_FRIEND_ID, GET_MESSAGES, INIT_SOCKET } from './types';
import io from 'socket.io-client';

export const chatWithUser = (friendID, socket) => dispatch => {
  dispatch(getMessages(friendID, socket));
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

export const initSocket = userID => dispatch => {
  return new Promise((resolve, reject) => {
    const socket = io.connect('http://localhost:5000', {
      query: `userID=${userID}`
    });
    if (socket) {
      resolve(
        dispatch({
          type: INIT_SOCKET,
          payload: socket
        })
      );
    } else {
      reject(
        dispatch({
          type: INIT_SOCKET,
          payload: null
        })
      );
    }
  });
};

export const getMessages = (friendID, socket) => dispatch => {
  return new Promise((resolve, reject) => {
    socket.emit('getMessages', { friendID });
    socket.on('ReceiveMessages', messages => {
      if (messages) {
        resolve(
          dispatch({
            type: GET_MESSAGES,
            payload: messages
          })
        );
      } else {
        reject(
          dispatch({
            type: GET_MESSAGES,
            payload: null
          })
        );
      }
    });
  });
};
