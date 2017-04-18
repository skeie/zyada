/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import {AppRegistry} from 'react-native';
import React, { Component } from 'react';
import Routes from './src/routes';

export default class zyada extends Component {
  render() {
    return (
    <Routes />
    );
  }
}

AppRegistry.registerComponent('zyada', () => zyada);
