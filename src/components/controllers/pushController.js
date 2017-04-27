import React, { Component } from 'react';
import OneSignal from 'react-native-onesignal';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

class Pushcontroller extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    componentWillMount() {
        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
    }

    componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
    }

    onReceived(notification) {
        console.log('Notification received: ', notification);
    }

    onOpened = openResult => {
        // const { openResult: { notification }}
        debugger;
        if (
            Boolean(
                openResult.notification.payload.additionalData.showHighScore,
            )
        ) {
            const actionToDispatch = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Highscore' }),
                ],
            });
            this.props.navigation.dispatch(actionToDispatch);
        }
        // console.log('Message: ', openResult.notification.payload.body);
        // console.log('Data: ', openResult.notification.payload.additionalData);
        // console.log('isActive: ', openResult.notification.isAppInFocus);
        // console.log('openResult: ', openResult);
    };
    render() {
        return null;
    }
}

export default Pushcontroller;
