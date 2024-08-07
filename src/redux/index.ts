import {combineReducers} from 'redux';
import profileSlice from './reducers/Profile/index';

const rootReducer = combineReducers({
  profile: profileSlice
});

export default rootReducer;
