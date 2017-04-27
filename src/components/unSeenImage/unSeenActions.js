import * as types from './unSeenImageActionTypes';
import { get, put } from '../../utils/fetch';

export const fetchUnSeenImages = () => ({
    type: [
        types.FETCH_UNSEEN_IMAGES,
        types.FETCH_UNSEEN_IMAGES_SUCCESS,
        types.FETCH_UNSEEN_IMAGES_FAIL,
    ],
    promise: () => get(`/images/unSeen`),
});

export const setImageSeen = (id, index) => ({
    type: [
        types.SET_IMAGE_SEEN,
        types.SET_IMAGE_SEEN_SUCCESS,
        types.SET_IMAGE_SEEN_FAIL,
    ],
    index,
    promise: () => put(`/images/unSeen/${id}`),
});

export const setImageDecline = (id, index) => ({
    type: [
        types.SET_IMAGE_DECLINE,
        types.SET_IMAGE_DECLINE_SUCCESS,
        types.SET_IMAGE_DECLINE_FAIL,
    ],
    index,
    promise: () => put(`/images/unSeen/${id}/decline`),
});
