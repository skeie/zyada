/**
 * @flow
 */

import React, { Component } from 'react';
require('./utils/onRun');
import { StatusBar } from 'react-native';
import get from 'lodash/get';
import AppWithRedux from './connectWithRedux';
import OneSignal from 'react-native-onesignal';

export default class App extends Component {
    state = {
        initialRouteName: 'Root',
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

    onReceived(notification: Object) {
        console.log('Notification received: ', notification);
    }

    onOpened = (openResult: Object) => {
        const showHighScore = get(
            openResult,
            'notification.payload.additionalData.showHighScore',
        );

        if (Boolean(showHighScore)) {
            this.setState({ initialRouteName: 'Highscore' });
        }
        // console.log('Message: ', openResult.notification.payload.body);
        // console.log('Data: ', openResult.notification.payload.additionalData);
        // console.log('isActive: ', openResult.notification.isAppInFocus);
        // console.log('openResult: ', openResult);
    };
    render() {
        return <AppWithRedux {...this.state} />;
    }
}
