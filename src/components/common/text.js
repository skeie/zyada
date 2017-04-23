import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { isAndroid } from '../../utils/utils';
import fonts from '../../utils/fonts';
export const textStyle = StyleSheet.create({
    defaultStyle: {
        color: 'white',
    },
});

class ZyadaText extends Component {
    static defaultProps = {
        fontFamily: 'one',
    };
    render() {
        console.log('sapdpa', fonts(this.props.fontFamily));
        
        const combineStyle = [
            this.props.style,
            fonts(this.props.fontFamily),
            textStyle.defaultStyle,
        ];
        return (
            <Text {...this.props} style={combineStyle}>
                {this.props.children}
            </Text>
        );
    }
}

export default ZyadaText;
