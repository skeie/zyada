/**
 * @flow
 */

import React, { Component } from 'react';
import { NavigationExperimental, View, StatusBar } from 'react-native';
const {
    CardStack: NavigationCardStack,
    Header: NavigationHeader,
} = NavigationExperimental;
import { connect } from 'react-redux';
import { push, pop, appReady } from './routeActions';
import renderScene from './renderScene';
import scenes from './scenes';
import Loading from '../common/loadingScreen';
import { fetchUnSeenImages } from '../unSeenImage/unSeenActions';
import OneSignal from 'react-native-onesignal';

class Router extends Component {
    state = {
        isReady: false,
    };
    componentDidMount() {
        const { user } = this.props;

        StatusBar.setHidden(true);
        if (user.get('jwtToken')) {
            this.props.dispatch(fetchUnSeenImages());
        }
        setTimeout(() => {
            this.setState({
                isReady: true,
            });
        }, 2500);
    }

    // shouldComponentUpdate({router}, {isReady}) {
    //     return isReady !== this.state.isReady;
    //     // return false;
    // }

    componentWillUpdate(nextProps, { isReady }) {
        if (!this.state.isReady && isReady) {
            // app is ready!
            let key = '';
            const { user } = this.props;
            const unSeenImages = this.props.unSeenImage.get('images');

            if (unSeenImages.size) {
                key = scenes.previewImage;
            } else if (user.get('jwtToken')) {
                key = scenes.main;
            } else {
                key = scenes.onboarding;
            }

            this.props.appReady(key);
        }
    }

    renderScene = route => renderScene(route, this.props.user);

    render() {
        let direction = 'horizontal';
        if (
            this.props.router.prevPushedRoute &&
            this.props.router.prevPushedRoute.type === 'modal'
        ) {
            direction = 'vertical';
        }

        if (!this.state.isReady) return <Loading />;

        console.log('hvor mange ganger i render?', this.props);

        return (
            <NavigationCardStack
                direction={direction}
                navigationState={this.props.router}
                renderScene={this.renderScene}
            />
        );
    }
}

export default connect(
    ({ router, user, unSeenImage }) => ({ router, user, unSeenImage }),
    dispatch => ({
        appReady: route => dispatch(appReady(route)),
        pop: () => dispatch(pop()),
        dispatch,
    }),
)(Router);
