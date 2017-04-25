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
            screen: ApprovedImage
        }
    },
    {
        headerMode: 'none',
    },
);

export default StackRouter;
