import * as types from './userActionTypes';
import { post, get, put } from '../../utils/fetch';

export const login = user => ({
    type: [types.USER_LOGIN, types.USER_LOGIN_SUCCESS, types.USER_LOGIN_FAIL],
    user,
    promise: () => post(`/users`, user),
});

export const fetchUser = () => ({
    type: [types.USER_LOGIN, types.USER_LOGIN_SUCCESS, types.USER_LOGIN_FAIL],
    promise: () => get(`/users`),
});

export const updateUser = user => ({
    type: [
        types.USER_UPDATE,
        types.USER_UPDATE_SUCCESS,
        types.USER_UPDATE_FAIL,
    ],
    user,
    promise: () => put('/users', user),
});
