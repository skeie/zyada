/**
 * @flow
 */

import { mainColor } from '../../theme/colors';
import React from 'react';
import { Image, View, TouchableWithoutFeedback } from 'react-native';

const NO_OP = () => {};
const IMAGE_HEIGHT = 50;

const getUserStyles = (calculateOutlinedUser, user, index) =>
    calculateOutlinedUser({ data: user, index })
        ? {
              borderColor: mainColor,
              borderWidth: 3,
          }
        : {};

const UserImages = ({
    images,
    calculateOutlinedUser,
    goToHighscore = NO_OP,
}) => (
    <TouchableWithoutFeedback onPress={goToHighscore}>
        <View
            style={{
                position: 'absolute',
                right: 10,
                top: 10,
                justifyContent: 'space-between',
                height: images.size * IMAGE_HEIGHT + 20,
            }}>
            {images.map((user, index) => (
                <Image
                    key={index}
                    style={{
                        height: IMAGE_HEIGHT,
                        width: IMAGE_HEIGHT,
                        borderRadius: 25,
                        ...getUserStyles(calculateOutlinedUser, user, index),
                    }}
                    index={index}
                    source={{
                        uri: user.image,
                    }}
                />
            ))}
        </View>
    </TouchableWithoutFeedback>
);

export default UserImages;
