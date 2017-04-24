
import { combineReducers } from 'redux';
import user from './components/user/userReducer';
import unSeenImage from './components/unSeenImage/unSeenImageReducer';
import router from './components/router/routeReducer';

const rootReducer = combineReducers({
    user,
    unSeenImage,
    router
});

export default rootReducer;
