import React, { Component } from 'react';
import { Image, Animated } from 'react-native';
import { winScreen } from '../../images/images';
class WinBackground extends Component {
    // state = {
    //     banans: this._getBanans(),
    // };

    // _getBanans = () =>
    //     [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => ({
    //         animation: Animated.Value(0),
    //         start: getRandomInt(100, width - 100),
    //     }));

    // componentDidMount() {
    //     const animated = Animated.Value(0);
    //     this.setState(() => {}))
    // }
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    render() {
        return (
            <Image
                style={{
                    flex: 1,
                    width: undefined,
                    height: undefined
                }}
                source={winScreen}
            />
        );
    }
}

export default WinBackground;
