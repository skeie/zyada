/**
 * @flow
 */

import React, { Component } from 'react';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Login from '../login/loginContainter';
import ImagePreview from '../imagePreview/imagePreviewContainer';
import WinScreen from '../common/winBackground';
import FailScreen from '../common/errorBackground';
import Loading from '../common/loadingScreen';
import ApprovedImage from '../approvedImage/approvedImageContainer';
import Highscore from '../highscore/highscoreContainer';
import { goToRoute } from './routerCommon';
import { connect } from 'react-redux';
import { fetchUnSeenImages } from '../unSeenImage/unSeenActions';
import { fetchHighscore } from '../highscore/highscoreActions';
import FetchAllData from '../common/fetchAllData';
import { fetchUser } from '../user/userActions';
import NumberOfWorkouts from '../login/numberOfWorkouts';
import HomeScreen from './homeScreen';
const StackRouter = StackNavigator(
    {
        Loading: {
            screen: Loading,
        },
        Login: {
            screen: Login,
        },
        Home: {
            screen: HomeScreen,
        },
        ImagePreview: {
            screen: ImagePreview,
        },
        ApprovedImage: {
            screen: ApprovedImage,
        },
        FetchAllData: {
            screen: FetchAllData,
        },
        NumberOfWorkouts: {
            screen: NumberOfWorkouts,
        },
    },
    {
        headerMode: 'none',
        initialRouteName: 'Loading',
    },
);

const AppNavigator = StackRouter;

class InitRouter extends React.Component {
    navigator = {};

    shouldComponentUpdate({ unSeenImages, initialRouteName }, nextState) {
        return (
            unSeenImages !== this.props.unSeenImages ||
            initialRouteName !== this.props.initialRouteName
        );
    }

    calculateInitRoute = () => {
        const { unSeenImages, jwtToken, initialRouteName } = this.props;
        if (initialRouteName) {
            this.goToRoute(initialRouteName);
        } else if (unSeenImages.size) {
            return this.goToRoute('ImagePreview');
        } else if (jwtToken) {
            return this.goToRoute('Home');
        } else this.goToRoute('Login');
    };

    componentWillReceiveProps({ initialRouteName }) {
        if (
            this.props.initialRouteName !== initialRouteName &&
            initialRouteName
        ) {
            this.navigator &&
                goToRoute(this.navigator.dispatch, initialRouteName);
        }
    }

    goToRoute = initialRouteName => {
        this.navigator && goToRoute(this.navigator.dispatch, initialRouteName);
    };
    fetchData = async () => {
        if (this.props.jwtToken) {
            const fetchAllData = await this.props.dispatch(fetchUnSeenImages());

            this.calculateInitRoute();
        } else {
            this.calculateInitRoute();
        }
    };

    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (
            <AppNavigator
                ref={nav => {
                    this.navigator = nav;
                }}
            />
        );
    }
}

export default connect(({ user, unSeenImage }) => ({
    jwtToken: user.get('jwtToken'),
    unSeenImages: unSeenImage.get('images'),
}))(InitRouter);
