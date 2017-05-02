/*
* @flow
*/

import { Dimensions, Platform } from 'react-native';
import RNFS from 'react-native-fs';
export const { width, height } = Dimensions.get('window');
export const isAndroid = Platform.OS === 'android';
export const getShadowStyle = ({
    shadowColor,
    shadowOpacity,
    shadowRadius,
    height,
    width,
    elevation = width,
}) =>
    Platform.select({
        ios: {
            shadowColor,
            shadowOpacity,
            shadowRadius,
            shadowOffset: {
                height,
                width,
            },
        },
        android: {
            elevation,
        },
    });

export const deleteFile = async (path: String) => {
    const newPath = path.split('://')[1];
    try {
        await RNFS.unlink(newPath);
        console.log('file is deleted');
    } catch (err) {
        console.log('File not deleted', err);
    }
};
