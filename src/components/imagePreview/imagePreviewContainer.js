import React, { Component } from 'react';
import ImagePreview from './imagePreview';
import { connect } from 'react-redux';
import { Image, TouchableOpacity, View } from 'react-native';
import { yellow } from '../../theme/colors';
import { checkedBtn, xBtn } from '../../images/images';
import {
    setImageSeen,
    fetchUnSeenImages,
    setImageDecline,
} from '../unSeenImage/unSeenActions';
import { Map } from 'immutable';
import { NavigationActions } from 'react-navigation';
import { goToRoute } from '../router/routerCommon';
import { width } from '../../utils/utils';
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

const Bottom = ({ onAccept, onDecline }) => (
    <View
        style={{
            position: 'absolute',
            bottom: 20,
            flexDirection: 'row',
            width,
            justifyContent: 'space-around',
        }}>
        <BottomBtn onPress={onDecline} source={xBtn} />
        <BottomBtn onPress={onAccept} source={checkedBtn} />
    </View>
);

const BottomBtn = ({ onPress, source }) => (
    <TouchableOpacity onPress={onPress}>
        <Image source={source} />
    </TouchableOpacity>
);

class ImagePreviewContainer extends Component {
    static defaultProps = {
        userImages: [],
    };

    componentDidMount() {
        // If app is open, and a push is recived
        // the app switches to this comp
        // but unseen img is not fecthed because its fetched in renderScene
        if (!this.props.currentImage.size) {
            this.props.dispatch(fetchUnSeenImages());
        }
    }

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

    onDecline = () => {
        const id = this.props.currentImage.get('id');
        this.props.dispatch(setImageDecline(id, 0));
    };

    render() {
        return (
            <ImagePreview uri={this.props.currentImage.get('url')}>
                <UserImage images={this.props.userImages} />
                <Bottom
                    onAccept={this.onCheckImage}
                    onDecline={this.onDecline}
                />
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
