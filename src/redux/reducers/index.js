import userReducers from './userReducers';
import { combineReducers } from 'redux'

const allreducers = combineReducers({
   user: userReducers,  
});

export default allreducers;


