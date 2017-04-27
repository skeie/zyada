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
import Router from './router';
import { goToRoute } from './routerCommon';

const StackRouter = StackNavigator(
    {
        Root: {
            screen: Router,
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
    },
);

// export default StackRouter;

const AppNavigator = StackRouter;

class InitRouter extends React.Component {
    componentDidMount() {
        this.navigator &&
            goToRoute(this.navigator.dispatch, this.props.initialRouteName);
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

export default InitRouter;
