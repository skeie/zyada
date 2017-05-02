import React from 'react';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { isAndroid } from '../../utils/utils';
import { View } from 'react-native';
const KeyboardSpacerContainer = () => {
    return isAndroid ? <View /> : <KeyboardSpacer />;
};

export default KeyboardSpacerContainer;
