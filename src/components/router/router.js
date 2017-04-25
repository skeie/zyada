/**
 * @flow
 */

import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PreviewImage from '../imagePreview/imagePreviewContainer';
import Main from '../camera/cameraContainer';
import Onboarding from '../login/loginContainter';

class Router extends Component {
    render() {
        const { unSeenImages, jwtToken } = this.props;
        if (unSeenImages.size) {
            return <PreviewImage />;
        } else if (jwtToken) {
            return <Main />;
        } else return <Onboarding />;
    }
}

export default connect(({ user, unSeenImage }) => ({
    jwtToken: user.get('jwtToken'),
    unSeenImages: unSeenImage.get('images'),
}))(Router);
