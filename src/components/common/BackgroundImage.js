import React from 'react';
import { banana, loadingScreen } from '../../images/images';
import { Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const BackgroundImage = ({ children, style = {} }) => (
    <LinearGradient
        colors={['#00EBCF', '#00BEEC']}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {children}
    </LinearGradient>
);

export default BackgroundImage;
