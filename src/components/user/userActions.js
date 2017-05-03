import * as types from './userActionTypes';
import { post, get } from '../../utils/fetch';

export const login = user => ({
    type: [types.USER_LOGIN, types.USER_LOGIN_SUCCESS, types.USER_LOGIN_FAIL],
    user,
    promise: () => post(`/users`, user),
});

export const fetchUser = () => ({
    type: [types.USER_LOGIN, types.USER_LOGIN_SUCCESS, types.USER_LOGIN_FAIL],
    promise: () => get(`/users`),
});
