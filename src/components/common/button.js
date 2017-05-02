import React from 'react';
import { TouchableOpacity } from 'react-native';
import { mainColor } from '../../theme/colors';
const Button = ({ children, onPress, style = {} }) => {
    return (
        <TouchableOpacity
            style={{
                borderRadius: 100,
                backgroundColor: mainColor,
                width: '80%',
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                ...style,
            }}
            onPress={onPress}>
            {children}
        </TouchableOpacity>
    );
};

export default Button;
