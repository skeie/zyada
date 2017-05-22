import { fromJS, List, Record } from 'immutable';
import * as types from './userActionTypes';

const initialState = fromJS({
    jwtToken: '',
    name: '',
    email: '',
    image: '',
    id: '',
    weeklyTraining: 3,
});

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case types.USER_LOGIN_SUCCESS:
            return state.merge({
                ...action.payload,
            });

        case types.USER_UPDATE_SUCCESS: {
            return state.merge({
                ...action.user,
            });
        }

        default:
            return state;
    }
}
