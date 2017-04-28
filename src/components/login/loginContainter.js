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
class LoginContainer extends Component {
    pushToken = '';
    state = {
        isLoginScreenActive: true,
        name: '',
        url: '',
        email: '',
    };

    componentDidMount() {
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
                isLoginScreenActive: false,
            });
        } catch (e) {
            console.log('error', e);
        }
    };

    onFinish = ({ selectedTrainingNumber, name }) => {
        const { url, email } = this.state;
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

    handleResponse = result => {
        if (result.payload) {
            setAuthorizationToken(result.payload.jwtToken); // set token so they can send images
        }
        goToRoute(this.props.navigation.dispatch, 'FetchAllData');
    };
    render() {
        return this.state.isLoginScreenActive
            ? <Login onLogin={this.onLogin} />
            : <UserProfile {...this.state} onFinish={this.onFinish} />;
    }
}

export default connect(() => ({}))(LoginContainer);
