import * as types from './highscoreActionTypes'
import { get } from '../../utils/fetch';
export const fetchHighscore = () => ({
    type: [types.FETCH_HIGHSCORE, types.FETCH_HIGHSCORE_SUCCESS, types.FETCH_HIGHSCORE_FAIL],
    promise: () => get(`/highscore`),
});