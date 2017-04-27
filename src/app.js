/**
 * @flow
 */

import React, { Component } from 'react';
require('./utils/onRun');
import { StatusBar } from 'react-native';
import get from 'lodash/get';
import AppWithRedux from './connectWithRedux';
import OneSignal from 'react-native-onesignal';

const IMAGE_PREVIEW = 'ImagePreview';

// Need to have one-signal outside of redux.
// If not, then the eventlistner's wont trigger
// https://github.com/geektimecoil/react-native-onesignal/issues/206

export default class App extends Component {
    state = {
        initialRouteName: '',
    };
    shouldComponentUpdate(nextProps: Object, { initialRouteName }) {
        return this.props.initialRouteName !== initialRouteName;
    }

    componentWillMount() {
        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
    }

    componentDidMount() {
        StatusBar.setHidden(true);
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
            if (initialRouteName === IMAGE_PREVIEW) {
                this.setState({ initialRouteName: IMAGE_PREVIEW });
            }
        } else if (Boolean(initialRouteName)) {
            this.setState({ initialRouteName });
        }
    };
    render() {
        return <AppWithRedux {...this.state} />;
    }
}
