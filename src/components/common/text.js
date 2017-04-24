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
