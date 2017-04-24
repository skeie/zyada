import React, { Component } from 'react';
import { Image } from 'react-native';
import { errorScreen } from '../../images/images';
class RedBackground extends Component {
    render() {
        return (
            <Image
                style={{
                    flex: 1,
                    width: undefined,
                    height: undefined
                }}
                source={errorScreen}
            />
        );
    }
}

export default RedBackground;
