import React, { Component } from 'react';
import { Text } from 'react-native';
class ZyadaText extends Component {
    render() {
        return (
            <Text {...this.props}>
                {this.props.children}
            </Text>
        );
    }
}

export default ZyadaText;
