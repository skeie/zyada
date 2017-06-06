/*
* @flow
*/

import React from 'react';
import { View, Image } from 'react-native';
import { streak as streakImage } from '../../images/images';
import { connect } from 'react-redux';
import Text from '../common/text';
import InfinteSpinningImage from '../common/infinteSpinningImage';
import { yellow } from '../../theme/colors';
const Streak = ({ streak }) => (
    <View
        style={{
            justifyContent: 'space-around',
            alignItems: 'center',
            flex: 1,
        }}>
        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <Text
                style={{
                    backgroundColor: 'transparent',
                    color: 'black',
                    textAlign: 'center',
                    fontSize: 31,
                    marginRight: 10,
                }}>
                Current Streak
            </Text>
            <InfinteSpinningImage source={streakImage} images={3} />
        </View>
        <Text
            style={{
                backgroundColor: 'transparent',
                color: yellow,
                textAlign: 'center',
                fontSize: 118,
            }}>
            {streak}
        </Text>
        <View style={{ alignItems: 'center' }}>
            <Text style={{ color: 'black', textAlign: 'center' }}>
                The fire represents your streak
            </Text>
            <Text style={{ color: 'black', textAlign: 'center' }}>
                You will increase your streak by one if you reach training goal within a week
            </Text>
        </View>
    </View>
);

export default Streak;
