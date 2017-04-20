
import { combineReducers } from 'redux';
import user from './components/user/userReducer';
import unSeenImage from './components/unSeenImage/unSeenImageReducer';
const rootReducer = combineReducers({
    user,
    unSeenImage 
});

export default rootReducer;
