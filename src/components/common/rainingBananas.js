/**
 * @flow
 */

import React, { Component } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { height, width } from '../../utils/utils';
import { yellowBanana } from '../../images/images';

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

class RainingBananas extends Component {
    static defaultProps = {
        delay: 200,
        isInfinite: false,
    };
    constructor(props) {
        super(props);

        this.state = {
            bananas: [],
        };
    }

    componentDidMount() {
        for (let i = 0; i < this.props.score; i++) {
            this.handleBananas(this.props.delay * i);
        }
    }

    handleBananas = delay => {
        const animation = new Animated.Value(0);
        this.setState(
            state => ({
                bananas: [
                    ...state.bananas,
                    { animation, start: getRandomInt(0, width - 100) },
                ],
            }),
            () => {
                Animated.timing(animation, {
                    toValue: height,
                    duration: 2000,
                    delay,
                }).start(({ finished }) => {
                    const randomInt = getRandomInt(0, 10);
                    this.props.isInfinite &&
                        this.handleBananas(this.props.delay * randomInt);
                });
            },
        );
    };

    render() {
        return (
            <View style={StyleSheet.absoluteFill}>
                {this.state.bananas.map(({ animation, start }, index) => {
                    const dividedHeight = height / 3;

                    const positionInterpolate = animation.interpolate({
                        inputRange: [0, height],
                        outputRange: [0, height],
                    });

                    const opacityInterpolate = animation.interpolate({
                        inputRange: [0, 50],
                        outputRange: [0, 1],
                    });

                    const rotateInterpolate = animation.interpolate({
                        inputRange: [
                            0,
                            dividedHeight * 1,
                            dividedHeight * 2,
                            dividedHeight * 3,
                            dividedHeight * 4,
                            dividedHeight * 5,
                            dividedHeight * 6,
                        ],
                        outputRange: [
                            '0deg',
                            '180deg',
                            '360deg',
                            '540deg',
                            '720deg',
                            '900deg',
                            '1080deg',
                        ],
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

                    const banansStyle = {
                        left: start,
                        top: 0,
                        position: 'absolute',
                        transform: [
                            { translateY: positionInterpolate },
                            { rotate: rotateInterpolate },
                        ],
                        opacity: opacityInterpolate,
                    };

                    return (
                        <Animated.Image
                            key={index}
                            source={yellowBanana}
                            style={banansStyle}
                        />
                    );
                })}
                {this.props.children}
            </View>
        );
    }
}

export default RainingBananas;
