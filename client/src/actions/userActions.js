import axios from 'axios';
import {
  GET_USER,
  USER_LOADING,
  CLEAR_CURRENT_USER,
  GET_ERRORS,
  UPDATE_USER,
  CLEAR_ERRORS
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
