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
import { fetchHighscore } from '../highscore/highscoreActions';
import Loading from '../common/loadingScreen';

class Router extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: Boolean(props.jwtToken),
        };
        this.fetchData();
    }

    fetchData = () => {
        if (this.props.jwtToken) {
            Promise.all([
                this.props.dispatch(fetchUnSeenImages()),
                this.props.dispatch(fetchHighscore()),
            ]).then(() => {
                setTimeout(() => {
                    this.setState({
                        loading: false,
                    });
                }, 1500);
            });
        }
    };

    render() {
        if (this.state.loading) {
            return <Loading />;
        }
        const { unSeenImages, jwtToken } = this.props;
        if (unSeenImages.size) {
            return <PreviewImage {...this.props} />;
        } else if (jwtToken) {
            return <Main {...this.props} />;
        } else return <Onboarding {...this.props} />;
    }
}

export default connect(({ user, unSeenImage }) => ({
    jwtToken: user.get('jwtToken'),
    unSeenImages: unSeenImage.get('images'),
}))(Router);
