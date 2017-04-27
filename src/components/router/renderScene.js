/**
 * @flow
 */

import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import Login from '../login/loginContainter';
import ImagePreview from '../imagePreview/imagePreviewContainer';
import Camera from '../camera/cameraContainer';
import WinScreen from '../common/winBackground';
import FailScreen from '../common/errorBackground';
import Loading from '../common/loadingScreen';
import ApprovedImage from '../approvedImage/approvedImageContainer';
import Highscore from '../highscore/highscoreContainer';
import { goToRoute } from './routerCommon';
import { connect } from 'react-redux';
import { fetchUnSeenImages } from '../unSeenImage/unSeenActions';
import { fetchHighscore } from '../highscore/highscoreActions';

const StackRouter = StackNavigator(
    {
        Loading: {
            screen: Loading,
        },
        Login: {
            screen: Login,
        },
        Home: {
            screen: Camera,
        },
        ImagePreview: {
            screen: ImagePreview,
        },
        ApprovedImage: {
            screen: ApprovedImage,
        },
        Highscore: {
            screen: Highscore,
        },
    },
    {
        headerMode: 'none',
        initialRouteName: 'Loading',
    },
);

// export default StackRouter;

const AppNavigator = StackRouter;

class InitRouter extends React.Component {
    constructor(props) {
        super(props);
        this.navigator = {};
    }

    shouldComponentUpdate({ unSeenImages }, nextState) {
        return unSeenImages !== this.props.unSeenImages;
    }

    calculateInitRoute = () => {
        const { unSeenImages, jwtToken, initialRouteName } = this.props;
        console.log('yolo?');

        if (initialRouteName) {
            this.goToRoute(initialRouteName);
        } else if (unSeenImages.size) {
            return this.goToRoute('ImagePreview');
        } else if (jwtToken) {
            return this.goToRoute('Home');
        } else this.goToRoute('Login');
    };
    goToRoute = initialRouteName => {
        console.log(this.navigator, 'hallo');
        this.navigator && goToRoute(this.navigator.dispatch, initialRouteName);
    };
    fetchData = () => {
        if (this.props.jwtToken) {
            Promise.all([
                this.props.dispatch(fetchUnSeenImages()),
                this.props.dispatch(fetchHighscore()),
            ]).then(() => {
                setTimeout(() => {
                    this.calculateInitRoute();
                }, 1500);
            });
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
