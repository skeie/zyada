import React from 'react';
import { banana, loadingScreen } from '../../images/images';
import { Image } from 'react-native';

const BackgroundImage = ({ children }) => (
    <Image
        source={loadingScreen}
        style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            height: undefined,
            width: undefined,
        }}>
        {children}
    </Image>
);

export default BackgroundImage;
