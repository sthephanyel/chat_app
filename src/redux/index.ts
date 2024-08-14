import {combineReducers} from 'redux';
import profileSlice from './reducers/Profile/index';
import userSlice from './reducers/User/index';

const rootReducer = combineReducers({
  profile: profileSlice,
  user: userSlice
});

export default rootReducer;
