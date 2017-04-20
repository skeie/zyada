import * as types from './cameraActionTypes';
import { postMultipart, get } from '../../utils/fetch';

export const postImage = (id, uri) => (
    {
        type: [
            types.POST_IMAGE,
            types.POST_IMAGE_SUCCESS,
            types.POST_IMAGE_FAIL
        ],
        promise: () => postMultipart(`/images`, uri),
    }
)
