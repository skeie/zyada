/**
 * @flow
 */

import { mainColor } from '../../theme/colors';
import React from 'react';
import { Image, View, TouchableWithoutFeedback } from 'react-native';

const NO_OP = () => {};
const IMAGE_HEIGHT = 50;

const getSize = (images = {}) => images.size || images.length;

const UserImages = ({ images = [], goToHighscore = NO_OP }) =>
    <TouchableWithoutFeedback onPress={goToHighscore}>
        <View
            style={{
                position: 'absolute',
                right: 10,
                top: 10,
                justifyContent: 'space-around',
                height: getSize(images) * IMAGE_HEIGHT + 40,
                borderWidth: 1,
                borderColor: mainColor,
                borderRadius: 30,
                padding: 5,
            }}>
            {images.map((user, index) =>
                <Image
                    key={index}
                    style={{
                        height: IMAGE_HEIGHT,
                        width: IMAGE_HEIGHT,
                        borderRadius: 25,
                    }}
                    index={index}
                    source={{
                        uri: user.image,
                    }}
                />,
            )}
        </View>
    </TouchableWithoutFeedback>;

export default UserImages;
