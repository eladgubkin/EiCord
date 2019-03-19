import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import userReducer from './userReducer';
import friendshipReducer from './friendshipReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  user: userReducer,
  friendships: friendshipReducer
});
