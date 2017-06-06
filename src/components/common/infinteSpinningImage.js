/*
* @flow
*/

import React, { Component } from 'react';
import { View, Animated } from 'react-native';
import times from 'lodash/times';
class InfiniteSpinningImage extends Component {
    state = {
        animated: new Animated.Value(0),
        index: 0,
    };
    componentDidMount() {
        this.startAnimation();
    }

    startAnimation = () => {
        Animated.timing(this.state.animated, {
            duration: 1000,
            toValue: 1,
            useNativeDriver: true,
        }).start(() => {
            this.setState(
                ({ index }) => ({
                    index: index === this.props.images ? 0 : index + 1,
                    animated: new Animated.Value(0),
                }),
                this.startAnimation,
            );
        });
    };

    render() {
        const interpolation = this.state.animated.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
        });
        const imageStyle = {
            transform: [
                {
                    rotate: interpolation,
                },
            ],
        };
        const { images, source } = this.props;
        return (
            <View style={{ flexDirection: 'row' }}>
                {times(images).map(index => {
                    return (
                        <Animated.Image
                            style={index === this.state.index ? imageStyle : {}}
                            source={this.props.source}
                        />
                    );
                })}

            </View>
        );
    }
}
export default InfiniteSpinningImage;
