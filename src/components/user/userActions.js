import * as types from './userActionTypes';
import { post } from '../../utils/fetch';

export const login = user => ({
    type: [types.USER_LOGIN, types.USER_LOGIN_SUCCESS, types.USER_LOGIN_FAIL],
    user,
    promise: () => post(`/users`, user),
});

export const fetchUnSeenImages = user => ({
    type: [types.USER_UNSEEN_IMAGES, types.USER_UNSEEN_IMAGES_SUCCESS, types.USER_UNSEEN_IMAGES_FAIL],
    user,
    promise: () => post(`/users`, user),
});
