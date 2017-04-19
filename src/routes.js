/**
 * @flow
 */

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Camera from './components/camera/cameraContainer';
import OneSignal from 'react-native-onesignal';
import Login from './components/login/login';
import { connect } from 'react-redux';
import { fetchUnSeenImages } from './components/user/userActions';

class Routes extends Component {
    componentDidMount() {
        OneSignal.configure({});
        this.props.dispatch(fetchUnSeenImages());
    }

    render() {
        return <Camera />;
        // return <Login />
    }
}

export default connect()(Routes);
