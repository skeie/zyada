/**
 * @flow
 */

import React, { Component } from 'react';
require('./utils/onRun');
import { StatusBar, View } from 'react-native';
import get from 'lodash/get';
import AppWithRedux from './connectWithRedux';
import OneSignal from 'react-native-onesignal';
import codePush from 'react-native-code-push';
import { loadOfflineData } from './store';
import KeyboardSpacer from './components/common/keyboardSpacer';
const IMAGE_PREVIEW = 'ImagePreview';

// Need to have one-signal outside of redux.
// If not, then the eventlistner's wont trigger
// https://github.com/geektimecoil/react-native-onesignal/issues/206

class App extends Component {
    state = {
        initialRouteName: '',
        loaded: false,
    };
    shouldComponentUpdate(nextProps: Object, { initialRouteName, loaded }) {
        return (
            this.props.initialRouteName !== initialRouteName ||
            (loaded && !this.state.loaded)
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
    }

    componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
    }

    onReceived = (notification: Object) => {
        console.log('Notification received: ', notification);
    };
    _getInitialRouteName = (notification: Object) =>
        get(notification, 'payload.additionalData.initialRouteName');

    onOpened = (openResult: Object) => {
        const initialRouteName = this._getInitialRouteName(
            openResult.notification,
        );
        /**
         *  If app in focus, need to switch to image_PREVIEW 
         * if thats the initialRouteName
         */

        if (openResult.notification.isAppInFocus) {
            if (Boolean(initialRouteName)) {
                this.setState({ initialRouteName });
            }
        }
    };
    render() {
        if (!this.state.loaded) return null;
        return (
            <View style={{ flex: 1 }}>
                <AppWithRedux {...this.state} />
                <KeyboardSpacer />
            </View>
        );
    }
}

const codePushOptions = {
    checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
    installMode: codePush.InstallMode.ON_NEXT_RESUME,
};
App = codePush(codePushOptions)(App);

module.exports = App;
