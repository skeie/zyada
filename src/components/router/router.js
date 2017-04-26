/**
 * @flow
 */

import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PreviewImage from '../imagePreview/imagePreviewContainer';
import Main from '../camera/cameraContainer';
import Onboarding from '../login/loginContainter';
import { fetchUnSeenImages } from '../unSeenImage/unSeenActions';
import Loading from '../common/loadingScreen';

class Router extends Component {
    state = {
        loading: true,
    };
    componentDidMount() {
        if (this.props.jwtToken) {
            this.props.dispatch(fetchUnSeenImages()).then(() => {
                setTimeout(() => {
                    this.setState({
                        loading: false,
                    });
                }, 1500);
            });
        }
    }

    render() {
        if (this.state.loading) {
            return <Loading />;
        }
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
