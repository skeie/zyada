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
        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
    }

    componentDidMount() {
        StatusBar.setHidden(true);
        loadOfflineData().finally(() => {
            this.setState({
                loaded: true,
            });
        });

        CodePush.sync({}, this.codePushStatusDidChange.bind(this));
    }

    codePushStatusDidChange(syncStatus) {
        switch (syncStatus) {
            case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
                console.log({ syncMessage: 'Checking for update.' });
                break;
            case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                console.log({ syncMessage: 'Downloading package.' });
                break;
            case CodePush.SyncStatus.AWAITING_USER_ACTION:
                console.log({ syncMessage: 'Awaiting user action.' });
                break;
            case CodePush.SyncStatus.INSTALLING_UPDATE:
                console.log({ syncMessage: 'Installing update.' });
                break;
            case CodePush.SyncStatus.UP_TO_DATE:
                console.log({
                    syncMessage: 'App up to date.',
                    progress: false,
                });
                break;
            case CodePush.SyncStatus.UPDATE_IGNORED:
                console.log({
                    syncMessage: 'Update cancelled by user.',
                    progress: false,
                });
                break;
            case CodePush.SyncStatus.UPDATE_INSTALLED:
                console.log({
                    syncMessage: 'Update installed and will be applied on restart.',
                    progress: false,
                });
                break;
            case CodePush.SyncStatus.UNKNOWN_ERROR:
                console.log({
                    syncMessage: 'An unknown error occurred.',
                    progress: false,
                });
                break;
        }
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

const codePushOptions = {
    checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
    installMode: codePush.InstallMode.ON_NEXT_RESUME,
};
App = codePush(codePushOptions)(App);

module.exports = App;
