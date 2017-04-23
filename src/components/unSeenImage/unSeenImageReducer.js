import { fromJS, List } from 'immutable';
import * as types from './unSeenImageActionTypes';
const initialState = fromJS({
    images: new List(),
    isLoading: false,
    error: false,
    numberOfImages: 0
});

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case types.FETCH_UNSEEN_IMAGES_SUCCESS:
            return state.merge({
                ...action.payload,
                isLoading: false,
                error: false,
            });
        case types.FETCH_UNSEEN_IMAGES:
            return state.merge({
                isLoading: true,
                error: false,
            });
        case types.FETCH_UNSEEN_IMAGES_FAIL:
            return state.merge({
                isLoading: false,
                error: true,
            });

        case types.SET_IMAGE_SEEN_SUCCESS:
            return state.merge({
                images: state.get('images').delete(action.index),
                isLoading: false,
                error: true,
            });

        default:
            return state;
    }
}
