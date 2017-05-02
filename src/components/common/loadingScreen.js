import React, { Component } from 'react';
import { Animated, Easing, Image } from 'react-native';
import { banana } from '../../images/images';
import BackgroundImage from './backgroundImage';
import RainingBananas from './rainingBananas';
class LoadingScreen extends Component {
    render() {
        return (
            <BackgroundImage>
                <RainingBananas score={10} delay={500} isInfinite />
            </BackgroundImage>
        );
    }
}

export default LoadingScreen;
