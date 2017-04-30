/**
 * @flow
 */

import React, { Component } from 'react';
import { Image, View, Animated } from 'react-native';
import { errorScreen, failBanana } from '../../images/images';
import Text from './text';
import { height } from '../../utils/utils';

const divdedHeight = height / 10;

const StyledText = ({ children }) => (
    <Text
        style={{
            marginTop: 25,
            fontSize: 29,
            backgroundColor: 'transparent',
        }}>
        {children}
    </Text>
);

const AnimatedImage = () => {
    const animation = new Animated.Value(0);

    const interpolateY = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    const style = {
        transform: [{ translateY: interpolateY }],
    };
    Animated.spring(animation, {
        toValue: 100,
        useNativeDriver: true,
        speed: 1,
    }).start();
    return <Animated.Image source={failBanana} style={style} />;
};

class RedBackground extends Component {
    render() {
        return (
            <Image
                style={{
                    flex: 1,
                    width: undefined,
                    height: undefined,
                    alignItems: 'center',
                    alignSelf: 'stretch',
                    padding: 40,
                    justifyContent: 'space-around',
                }}
                source={errorScreen}
                resizeMode="contain">
                <AnimatedImage />
                <View
                    style={{
                        alignItems: 'center',
                        height: '50%',
                    }}>
                    <StyledText>Woops…!</StyledText>
                    <StyledText>
                        You just lost to {this.props.name}
                    </StyledText>
                    <StyledText>
                        🤙
                    </StyledText>
                </View>
            </Image>
        );
    }
}
export default RedBackground;
