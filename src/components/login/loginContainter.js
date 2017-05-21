/**
 * @flow
 */

import React, { Component } from 'react';
import Login from './login';
import { facebookLogin } from './facebookLogin';
import UserProfile from './UserProfile';
import { login } from '../user/userActions';
import { connect } from 'react-redux';
import OneSignal from 'react-native-onesignal';
import { resetRoute } from '../router/routeActions';
import { NavigationActions } from 'react-navigation';
import { setAuthorizationToken } from '../../utils/fetch';
import { goToRoute } from '../router/routerCommon';
import NumberOfWorkouts from './numberOfWorkouts';
const LOGIN = 'LOGIN';
const USERNAME = 'USERNAME';
const NUMBER_OF_WORKOUTS = 'NUMBER_OF_WORKOUTS';

class LoginContainer extends Component {
    pushToken = '';
    state = {
        currentScreen: LOGIN,
        name: '',
        url: '',
        email: '',
    };

    componentWillMount() {
        OneSignal.addEventListener('ids', this.onIds);
    }
    componentWillUnmount() {
        OneSignal.removeEventListener('ids', this.onIds);
    }

    onIds = device => {
        this.pushToken = device.userId;
    };
    onLogin = async () => {
        try {
            const {
                facebookData: { name, email, picture: { data: { url } } },
            } = await facebookLogin();
            this.setState({
                name,
                url,
                email,
                currentScreen: USERNAME,
            });
        } catch (e) {
            console.log('error', e);
        }
    };

    getCurrentScreen = () => {
        switch (this.state.currentScreen) {
            case LOGIN:
                return <Login onLogin={this.onLogin} />;
            case USERNAME:
                return <UserProfile {...this.state} onFinish={this.setName} />;
            case NUMBER_OF_WORKOUTS:
                return <NumberOfWorkouts onFinish={this.onFinish} />;

            default:
                return <Login onLogin={this.onLogin} />;
        }
    };
    onFinish = selectedTrainingNumber => {
        const { url, email, name } = this.state;
        this.props
            .dispatch(
                login({
                    name,
                    image: url,
                    email,
                    pushToken: this.pushToken,
                    weeklyTraining: selectedTrainingNumber,
                }),
            )
            .then(this.handleResponse);
    };

    setName = name => {
        this.setState({
            name,
            currentScreen: NUMBER_OF_WORKOUTS,
        });
    };
    handleResponse = result => {
        if (result.payload) {
            setAuthorizationToken(result.payload.jwtToken); // set token so they can send images
        }
        goToRoute(this.props.navigation.dispatch, 'FetchAllData');
    };
    render() {
        return this.getCurrentScreen();
    }
}

export default connect(() => ({}))(LoginContainer);
