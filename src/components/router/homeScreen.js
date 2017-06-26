import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation';
import Camera from '../camera/cameraGQL';
import Highscore from '../highscore/highscoreContainer';
import Challenge from '../challenge/challenge';

const MyApp = TabNavigator(
    {
        Challenge: {
            screen: Challenge,
        },
        Camera: {
            screen: Camera,
        },
        Highscore: {
            screen: Highscore,
        },
    },
    {
        initialRouteName: 'Challenge',
        animationEnabled: true,
        swipeEnabled: true,
        tabBarPosition: 'top',
        lazy: true,
        tabBarOptions: {
            showLabel: false,
            style: {
                height: 0,
            },
        },
    },
);

export default MyApp;
