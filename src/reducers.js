import { combineReducers } from 'redux';
import user from './components/user/userReducer';
import unSeenImage from './components/unSeenImage/unSeenImageReducer';
// import router from './components/router/routeReducer';
import highscore from './components/highscore/highscoreReducer';
import guilds from './components/guilds/guildReducer';
const rootReducer = combineReducers({
    user,
    unSeenImage,
    router: () => () => {},
    highscore,
    guilds,
});

export default rootReducer;
