/**
 * @flow
 */

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Camera from './components/camera/cameraContainer';
import OneSignal from 'react-native-onesignal';
import Login from './components/login/login';
import { connect } from 'react-redux';
import { fetchUnSeenImages } from './components/unSeenImage/unSeenActions';
import Loading from './components/common/loadingScreen';
import ImagePreviewContainer
    from './components/imagePreview/imagePreviewContainer';

class Routes extends Component {
    async componentDidMount() {
        OneSignal.configure({});
        this.props.dispatch(fetchUnSeenImages());
    }

    render() {
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

export default connect(({ unSeenImage }) => ({ unSeenImage }))(Routes);
