/*
* @flow
*/

import { Dimensions, Platform } from 'react-native';
import FileSystem from 'react-native-filesystem';
export const { width, height } = Dimensions.get('window');
export const isAndroid = () => Platform.OS === 'android';
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
    try {
        await FileSystem.delete('IMG_20170423_173639.jpg');
        console.log('file is deleted');
    } catch (err) {
        console.log('File not deleted', err);
    }
};
