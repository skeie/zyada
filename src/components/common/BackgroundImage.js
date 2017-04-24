import React from 'react';
import { banana, loadingScreen } from '../../images/images';
import { Image } from 'react-native';

const BackgroundImage = ({ children, style = {} }) => (
    <Image
        source={loadingScreen}
        style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            height: undefined,
            width: undefined,
            ...style,
        }}>
        {children}
    </Image>
);

export default BackgroundImage;
