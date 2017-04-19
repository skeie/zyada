
import { combineReducers } from 'redux';
import user from './components/user/userReducer';
const rootReducer = combineReducers({
    user,
});

export default rootReducer;
