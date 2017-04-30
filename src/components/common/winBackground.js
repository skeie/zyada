import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    View,
    TouchableWithoutFeedback,
    Dimensions,
    Animated,
    Image,
} from 'react-native';
import { winScreen, yellowBanana } from '../../images/images';
import Text from '../common/text';
const { width, height } = Dimensions.get('window');
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

const StyledText = ({ children }) => (
    <Text
        style={{
            backgroundColor: 'transparent',
            fontSize: 29,
            textAlign: 'center',
        }}>
        {children}
    </Text>
);
export default class WinBackground extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bananas: [],
        };
    }

    componentDidMount() {
        for (let i = 0; i < this.props.score; i++) {
            this.handleBananas(150 * i);
        }
    }

    handleBananas = delay => {
        const animation = new Animated.Value(0);
        this.setState(
            state => ({
                bananas: [
                    ...state.bananas,
                    { animation, start: getRandomInt(100, width - 100) },
                ],
            }),
            () => {
                Animated.timing(animation, {
                    toValue: height,
                    duration: 2000,
                    delay,
                }).start();
            },
        );
    };
    render() {
        return (
            <Image
                style={{
                    flex: 1,
                    width: undefined,
                    height: undefined,
                    alignSelf: 'stretch',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                source={winScreen}>
                <View style={StyleSheet.absoluteFill}>
                    {this.state.bananas.map(({ animation, start }, index) => {
                        const dividedHeight = height / 3;

                        const positionInterpolate = animation.interpolate({
                            inputRange: [0, height],
                            outputRange: [0, height],
                        });

                        const opacityInterpolate = animation.interpolate({
                            inputRange: [0, 100, height],
                            outputRange: [0, 1, 0],
                        });

                        const wobbleInterpolate = animation.interpolate({
                            inputRange: [
                                0,
                                dividedHeight * 1,
                                dividedHeight * 2,
                                dividedHeight * 3,
                                dividedHeight * 4,
                                dividedHeight * 5,
                                dividedHeight * 6,
                            ],
                            outputRange: [0, 50, -50, 50, -50, 50, -50],
                            extrapolate: 'clamp',
                        });

                        const heartStyle = {
                            left: start,
                            top: 0,
                            position: 'absolute',
                            transform: [
                                { translateY: positionInterpolate },
                                { translateX: wobbleInterpolate },
                            ],
                            opacity: opacityInterpolate,
                        };

                        return (
                            <Animated.Image
                                key={index}
                                source={yellowBanana}
                                style={heartStyle}
                            />
                        );
                    })}
                </View>

                <StyledText>Zyada!</StyledText>
                <StyledText>
                    You just won {this.props.score} bananas!!
                </StyledText>
            </Image>
        );
    }
}

const Heart = ({ style }) => (
    <Animated.View style={[styles.heart, style]}>
        <View style={[styles.heartShape, styles.leftHeart]} />
        <View style={[styles.heartShape, styles.rightHeart]} />
    </Animated.View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    heart: {
        width: 50,
        height: 50,
        position: 'absolute',
    },
    heartShape: {
        width: 30,
        height: 45,
        position: 'absolute',
        top: 0,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: '#6427d1',
    },
    leftHeart: {
        transform: [{ rotate: '-45deg' }],
        left: 5,
    },
    rightHeart: {
        transform: [{ rotate: '45deg' }],
        right: 5,
    },
});
