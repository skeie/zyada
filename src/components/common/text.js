import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import fonts from '../../utils/fonts';
export const textStyle = StyleSheet.create({
    defaultStyle: {
        color: 'white',
        backgroundColor: 'transparent',
    },
});

class ZyadaText extends Component {
    static defaultProps = {
        fontFamily: 'one',
    };
    render() {
        const combineStyle = [
            textStyle.defaultStyle,
            this.props.style,
            fonts(this.props.fontFamily),
        ];
        return (
            <Text {...this.props} style={combineStyle}>
                {this.props.children}
            </Text>
        );
    }
}

export default ZyadaText;
