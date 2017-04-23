import { Dimensions, Platform } from 'react-native';
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
