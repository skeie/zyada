import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import Fail from '../common/errorBackground';
import Success from '../common/winBackground';
import { resetRoute } from '../router/routeActions';
import scenes from '../router/scenes';
class ApproviedImageContainer extends Component {
    componentDidMount() {
        let method = this.props.goToMain;
        if (Boolean(this.props.isMoreUnseenImages)) {
            method = this.props.goToPreview;
        }
        setTimeout(method, 2500);
    }

    render() {
        return this.props.hasSomeoneSeenImage ? <Fail /> : <Success />;
    }
}

export default connect(
    ({ unSeenImage }) => ({
        hasSomeoneSeenImage: unSeenImage.get('hasSomeoneSeenImage'),
        isMoreUnseenImages: unSeenImage.get('images').size,
    }),
    dispatch => ({
        goToMain: () => dispatch(resetRoute(scenes.main)),
        goToPreview: () => dispatch(resetRoute(scenes.previewImage)),
    }),
)(ApproviedImageContainer);
