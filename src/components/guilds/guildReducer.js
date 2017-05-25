import { fromJS, List, Record } from 'immutable';
import * as types from './guildActionTypes';

const initialState = fromJS({
    guilds: [],
});

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case types.GET_GUILDS_SUCCESS:
            // debugger;
            return state.merge({ guilds: action.payload.guilds });
        default:
            return state;
    }
}
