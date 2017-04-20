import React, { Component } from 'react';
import { Animated, Easing, Image     } from 'react-native';
import { banana, loadingScreen } from '../../images/images';

class SpinningImg extends Component {
    state = {
        spinning: new Animated.Value(0),
    };

    componentDidMount() {
        // this.quote =
        //     quotes[Math.floor(Math.random() * (quotes.length - 0) + 0)];
        this.spin();
    }

    spin = () => {
        this.state.spinning.setValue(0);
        Animated.timing(this.state.spinning, {
            toValue: 1,
            duration: 1500,
            easing: Easing.linear,
        }).start(animation => {
            if (animation.finished) {
                this.spin();
            }
        });
    };

    render() {
        const edgeLength = 38;
        const squareAnimation = {
            height: edgeLength,
            width: edgeLength,
            transform: [
                {
                    rotate: this.state.spinning.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg'],
                    }),
                },
            ],
        };
        return (
            <Image  
                source={loadingScreen}
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: undefined,
                    width: undefined
                }}>
                <Animated.Image source={banana} style={squareAnimation} />
            </Image >
        );
    }
}

export default SpinningImg;
