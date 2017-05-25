/**
 * @flow
 */

import React, { Component } from 'react';
require('./utils/onRun');
import { StatusBar, View } from 'react-native';
import get from 'lodash/get';
import ConnectWithRedux from './connectWithRedux';
import OneSignal from 'react-native-onesignal';
import codePush from 'react-native-code-push';
import { loadOfflineData } from './store';
const IMAGE_PREVIEW = 'ImagePreview';

// Need to have one-signal outside of redux.
// If not, then the eventlistner's won't trigger
// https://github.com/geektimecoil/react-native-onesignal/issues/206

const INIT_ROUTE_VALUE = '';

class App extends Component {
    state = {
        initialRouteName: INIT_ROUTE_VALUE,
        loaded: false,
    };
    shouldComponentUpdate(nextProps: Object, { initialRouteName, loaded }) {
        return (
            this.props.initialRouteName !== initialRouteName ||
            (loaded && !this.state.loaded) ||
            initialRouteName !== INIT_ROUTE_VALUE
        );
    }

    componentWillMount() {
        OneSignal.checkPermissions(permissions => {
            const isOkeyWithPush = Object.values(permissions).find(
                permission => permission === 1,
            );

            if (isOkeyWithPush) {
                OneSignal.addEventListener('received', this.onReceived);
                OneSignal.addEventListener('opened', this.onOpened);
            }
        });
    }

    componentDidMount() {
        StatusBar.setHidden(true);
        loadOfflineData().finally(() => {
            this.setState({
                loaded: true,
            });
        });

        codePush
            .sync({
                checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
                installMode: codePush.InstallMode.ON_NEXT_RESUME,
            })
            .then(update => console.log('update', update))
            .catch(err => console.log('update error', err));
    }

    componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
    }

    onReceived = (notification: Object) => {
        if (!notification.isAppInFocus) {
            this.changeInitRoute(notification);
        }
    };
    _getInitialRouteName = (notification: Object) =>
        get(notification, 'payload.additionalData.initialRouteName');

    changeInitRoute = (payload: Object) => {
        const initialRouteName = this._getInitialRouteName(payload);

        /**
         *  If app in focus, need to switch to image_PREVIEW 
         * if thats the initialRouteName
         */

        if (Boolean(initialRouteName)) {
            // Don't change init param anymore, go there by clicking on user images
            // this.setState({ initialRouteName }, () => {
            //     this.setState({
            //         initialRouteName: INIT_ROUTE_VALUE,
            //     });
            // });
        }
    };

    onOpened = (openResult: Object) => {
        this.changeInitRoute(openResult.notification);
    };
    render() {
        if (!this.state.loaded) return null;
        return <ConnectWithRedux {...this.state} />;
    }
}

module.exports = App;
