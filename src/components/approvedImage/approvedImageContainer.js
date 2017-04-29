import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity } from 'react-native';
import Fail from './errorContainer';
import Success from './winContainer';
import { NavigationActions } from 'react-navigation';
import { goToRoute } from '../router/routerCommon';
class ApproviedImageContainer extends Component {
    _getMethod = () =>
        (Boolean(this.props.isMoreUnseenImages)
            ? this.goToPreview
            : this.goToMain);

    goToMain = () => {
        goToRoute(this.props.navigation.dispatch, 'Home');
    };

    goToPreview = () => {
        goToRoute(this.props.navigation.dispatch, 'ImagePreview');
    };

    onScreenPress = () => {
        const routerMethod = this._getMethod();
        routerMethod();
    };

    render() {
        return (
            <TouchableOpacity
                style={{ flex: 1 }}
                onPress={this.onScreenPress}
                activeOpacity={0.8}>
                {this.props.hasSomeoneSeenImage ? <Fail /> : <Success />}
            </TouchableOpacity>
        );
    }
}

export default connect(({ unSeenImage }) => ({
    hasSomeoneSeenImage: unSeenImage.get('hasSomeoneSeenImage'),
    isMoreUnseenImages: unSeenImage.get('images').size,
}))(ApproviedImageContainer);
