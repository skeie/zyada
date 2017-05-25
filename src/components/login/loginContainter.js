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
import { getGuilds } from '../guilds/guildActions';
import ChooseGuild from './chooseGuild';
import AskForPush from './askForPush';
const LOGIN = 'LOGIN';
const USERNAME = 'USERNAME';
const CHOOSE_GUILD = 'CHOOSE_GUILD';
const NUMBER_OF_WORKOUTS = 'NUMBER_OF_WORKOUTS';
const ASK_FOR_PUSH = 'ASK_FOR_PUSH';

class LoginContainer extends Component {
    pushToken = '';
    state = {
        currentScreen: this.props.token ? NUMBER_OF_WORKOUTS : LOGIN,
        name: '',
        url: '',
        email: '',
        guildId: '',
    };

    componentWillUnmount() {
        OneSignal.removeEventListener('ids', this.onIds);
    }

    componentWillMount() {
        OneSignal.addEventListener('ids', this.onIds);
    }

    shouldComponentUpdate(nextProps, { currentScreen }) {
        return currentScreen !== this.props.currentScreen;
    }

    fetchGuilds = () => this.props.dispatch(getGuilds());

    onIds = device => {
        this.pushToken = device.userId;
    };

    askForPushPermison = () => {
        OneSignal.requestPermissions({
            alert: true,
            badge: true,
            sound: true,
        });
    };

    goToNumberOfWorkouts = () =>
        this.setState({
            currentScreen: NUMBER_OF_WORKOUTS,
        });

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
            this.fetchGuilds();
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
            case CHOOSE_GUILD:
                return (
                    <ChooseGuild
                        guilds={this.props.guilds}
                        setGuild={this.setGuild}
                    />
                );
            case ASK_FOR_PUSH:
                return (
                    <AskForPush
                        askForPushPermison={this.askForPushPermison}
                        goToNumberOfWorkouts={this.goToNumberOfWorkouts}
                    />
                );

            default:
                return <Login onLogin={this.onLogin} />;
        }
    };
    onFinish = selectedTrainingNumber => {
        const { url, email, name, guildId } = this.state;
        this.props
            .dispatch(
                login({
                    name,
                    image: url,
                    email,
                    pushToken: this.pushToken,
                    weeklyTraining: selectedTrainingNumber,
                    guildId,
                }),
            )
            .then(this.handleResponse);
    };

    setName = name => {
        this.setState({
            name,
            currentScreen: CHOOSE_GUILD,
        });
    };

    setGuild = guildId => {
        this.setState({
            guildId,
            currentScreen: ASK_FOR_PUSH,
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

export default connect(({ user, guilds }) => ({
    token: user.get('jwtToken'),
    guilds: guilds.get('guilds'),
}))(LoginContainer);
