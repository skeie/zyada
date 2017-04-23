/**
 * @flow
 */

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Camera from './components/camera/cameraContainer';
import LoginContainer from './components/login/loginContainter';
import { connect } from 'react-redux';
import { fetchUnSeenImages } from './components/unSeenImage/unSeenActions';
import Loading from './components/common/loadingScreen';
import ImagePreviewContainer
    from './components/imagePreview/imagePreviewContainer';

class Routes extends Component {
    componentDidMount() {
        this.props.isLoggedIn && this.props.dispatch(fetchUnSeenImages());
    }

    render() {
        if (this.props.isLoggedIn) {
            return <LoginContainer />;
        }
        const unSeenImages = this.props.unSeenImage.get('images');
        if (this.props.unSeenImage.get('loading')) {
            return <Loading />;
        } else if (unSeenImages.size) {
            return <ImagePreviewContainer />;
        } else return <Camera />;
        // return <Loading />
        // return <Camera />;
        // return <Login />
    }
}

export default connect(({ unSeenImage, user }) => ({
    unSeenImage,
    isLoggedIn: user.get('jwtToken'),
}))(Routes);
