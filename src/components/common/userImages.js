/**
 * @flow
 */

import { yellow } from '../../theme/colors';
import React from 'react';
import { Image, View } from 'react-native';
const IMAGE_HEIGHT = 40;

const getUserStyles = (calculateOutlinedUser, user, index) =>
    (calculateOutlinedUser({ data: user, index })
        ? {
              borderColor: yellow,
              borderWidth: 3,
          }
        : {});

const UserImages = ({ images, calculateOutlinedUser }) => (
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
                    borderRadius: 20,
                    ...getUserStyles(calculateOutlinedUser, user, index),
                }}
                index={index}
                source={{
                    uri: user.image,
                }}
            />
        ))}
    </View>
);

export default UserImages;
