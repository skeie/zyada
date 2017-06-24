import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation';
import Camera from '../camera/cameraGQL';
import Highscore from '../highscore/highscoreContainer';

const lol = () => <View style={{ flex: 1, backgroundColor: 'red' }} />;

const MyApp = TabNavigator(
    {
        Challenge: {
            screen: lol,
        },
        Camera: {
            screen: Camera,
        },
        Highscore: {
            screen: Highscore,
        },
    },
    {
        initialRouteName: 'Highscore',
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
