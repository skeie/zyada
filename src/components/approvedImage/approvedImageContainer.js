import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import Fail from '../common/errorBackground';
import Success from '../common/winBackground';
import { NavigationActions } from 'react-navigation';
class ApproviedImageContainer extends Component {
    componentDidMount() {
        let method = this.goToMain;
        if (Boolean(this.props.isMoreUnseenImages)) {
            method = this.goToPreview;
        }
        setTimeout(method, 2500);
    }

    goToMain = () => {
        const actionToDispatch = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Home' })], // Array!
        });
        this.props.navigation.dispatch(actionToDispatch);
    };

    goToPreview = () => {
        const actionToDispatch = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'ImagePreview'})]
        })
    };
    render() {
        return this.props.hasSomeoneSeenImage ? <Fail /> : <Success />;
    }
}

export default connect(({ unSeenImage }) => ({
    hasSomeoneSeenImage: unSeenImage.get('hasSomeoneSeenImage'),
    isMoreUnseenImages: unSeenImage.get('images').size,
}))(ApproviedImageContainer);
