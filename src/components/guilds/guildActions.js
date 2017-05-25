import * as types from './guildActionTypes';
import { post, get, put } from '../../utils/fetch';

export const getGuilds = () => ({
    type: [types.GET_GUILDS, types.GET_GUILDS_SUCCESS, types.GET_GUILDS_FAIL],
    promise: () => get(`/guilds`),
});
