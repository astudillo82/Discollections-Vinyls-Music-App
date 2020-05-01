import { combineReducers } from 'redux';
import userReducers from './userReducers';

const allreducers = combineReducers({
  user: userReducers,
});

export default allreducers;
