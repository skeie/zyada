import { fromJS, List, Record } from 'immutable';
import * as types from './highscoreActionTypes';
const initialState = fromJS({
    isLoading: false,
    error: false
});

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case types.FETCH_HIGHSCORE_SUCCESS:
            return state.merge({
                ...action.payload,
                isLoading: false,
                error: false,
            });
        case types.FETCH_HIGHSCORE:
            return state.merge({
                isLoading: true,
                error: false,
            });
        case types.FETCH_HIGHSCORE_FAIL:
            return state.merge({
                isLoading: false,
                error: true,
            });

        default:
            return state;
    }
}