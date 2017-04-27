import React, { Component } from 'react';
import ImagePreview from './imagePreview';
import { connect } from 'react-redux';
import { Image, TouchableOpacity, View } from 'react-native';
import { yellow } from '../../theme/colors';
import { checkedBtn } from '../../images/images';
import { setImageSeen } from '../unSeenImage/unSeenActions';
import { resetRoute } from '../router/routeActions';
import { Map } from 'immutable';
import { NavigationActions } from 'react-navigation';
import { goToRoute } from '../router/routerCommon';
const getUserStyles = index =>
    (index === 0
        ? {
              borderColor: yellow,
              borderWidth: 3,
              height: 54,
              width: 54,
              top: 10,
              borderRadius: 25,
          }
        : {
              height: 35,
              width: 35,
              top: index === 1 ? 75 * index : 60 * index,
              borderRadius: 20,
          });

const UserImage = ({ images }) => (
    <View>
        {images.map((uri, index) => (
            <Image
                key={index}
                style={{
                    position: 'absolute',
                    right: 10,
                    ...getUserStyles(index),
                }}
                source={{
                    uri,
                }}
            />
        ))}
    </View>
);

const CheckedBtn = ({ onPress }) => (
    <TouchableOpacity
        style={{
            position: 'absolute',
            left: '45%',
            bottom: 20,
        }}
        onPress={onPress}>
        <Image source={checkedBtn} />
    </TouchableOpacity>
);

class ImagePreviewContainer extends Component {
    static defaultProps = {
        userImages: [],
    };
    onCheckImage = () => {
        const id = this.props.currentImage.get('id');
        this.props.dispatch(setImageSeen(id, 0)).then(this.goToApprovedImage);
    };

    goToApprovedImage = () => {
        goToRoute(this.props.navigation.dispatch, 'ApprovedImage');
    };

    componentWillReceiveProps({ currentImage }) {
        if (!currentImage.size) {
            goToRoute(this.props.navigation.dispatch, 'Home');
        }
    }

    render() {
        return (
            <ImagePreview uri={this.props.currentImage.get('url')}>
                <UserImage images={this.props.userImages} />
                <CheckedBtn onPress={this.onCheckImage} />
            </ImagePreview>
        );
    }
}

export default connect(({ unSeenImage }) => {
    return {
        currentImage: unSeenImage.getIn(['images', 0], new Map()),
        userImages: unSeenImage.get('images').map(image => image.get('image')),
    };
})(ImagePreviewContainer);
