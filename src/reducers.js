
import { combineReducers } from 'redux';
import user from './components/user/userReducer';
import unSeenImage from './components/unSeenImage/unSeenImageReducer';
// import router from './components/router/routeReducer';
import highscore from './components/highscore/highscoreReducer';
const rootReducer = combineReducers({
    user,
    unSeenImage,
    router: () => () => {},
    highscore
});

export default rootReducer;
