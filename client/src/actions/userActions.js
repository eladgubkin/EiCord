import axios from 'axios';
import {
  GET_USER,
  USER_LOADING,
  CLEAR_CURRENT_USER,
  GET_ERRORS,
  UPDATE_USER,
  CLEAR_ERRORS,
  SEARCH_USERS,
  CLEAR_SEARCH_USERS,
  GET_FRIENDS_INFO,
  CLEAR_FRIENDS_INFO,
  GET_REQUESTERS_INFO,
  CLEAR_REQUESTERS_INFO,
  GET_ACCEPTERS_INFO,
  CLEAR_ACCEPTERS_INFO
} from './types';

// Get current user
export const getCurrentUser = () => dispatch => {
  dispatch(setUserLoading());
  return axios
    .get('/api/user/current')
    .then(res =>
      dispatch({
        type: GET_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_USER,
        payload: {}
      })
    );
};

// Update User
export const updateUser = userData => dispatch => {
  return axios
    .post('/api/user/update', userData)
    .then(res => {
      dispatch({
        type: UPDATE_USER,
        payload: res.data
      });
      dispatch({
        type: CLEAR_ERRORS,
        payload: {}
      });
      dispatch(getCurrentUser());
      dispatch(setUserLoading());
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Clear user
export const clearCurrentUser = () => {
  return {
    type: USER_LOADING
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: CLEAR_CURRENT_USER
  };
};

// Search for users
export const searchUsers = searchInputObj => dispatch => {
  return axios
    .post('/api/user/search', searchInputObj)
    .then(res => {
      dispatch({
        type: SEARCH_USERS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: SEARCH_USERS,
        payload: {}
      })
    );
};
// Clear Search Users
export const clearSearchUsers = () => {
  return {
    type: CLEAR_SEARCH_USERS
  };
};

// Get users info
export const getUsersInfo = usersID => dispatch => {
  if (usersID['friendsID']) {
    return axios.post('/api/user/info', usersID).then(res => {
      dispatch({
        type: GET_FRIENDS_INFO,
        payload: res.data
      });
    });
  }

  if (usersID['requestersID']) {
    return axios.post('/api/user/info', usersID).then(res => {
      dispatch({
        type: GET_REQUESTERS_INFO,
        payload: res.data
      });
    });
  }

  if (usersID['acceptersID']) {
    return axios.post('/api/user/info', usersID).then(res => {
      dispatch({
        type: GET_ACCEPTERS_INFO,
        payload: res.data
      });
    });
  }
};

export const clearFriendsInfo = () => {
  return {
    type: CLEAR_FRIENDS_INFO
  };
};

export const clearRequestersInfo = () => {
  return {
    type: CLEAR_REQUESTERS_INFO
  };
};

export const clearAcceptersInfo = () => {
  return {
    type: CLEAR_ACCEPTERS_INFO
  };
};
