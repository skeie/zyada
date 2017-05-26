import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation';
import Camera from '../camera/cameraContainer';
import Highscore from '../highscore/highscoreContainer';

const MyApp = TabNavigator(
    {
        Camera: {
            screen: Camera,
        },
        Highscore: {
            screen: Highscore,
        },
    },
    {
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
