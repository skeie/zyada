/**
 *  @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { connect } from 'react-redux';
import Routes from './components/router/routes';

export default class App extends Component {
    static defaultProps = {
        initialRouteName: '',
    };

    render() {
        return (
            <Provider store={store}>
                <Routes {...this.props} />
            </Provider>
        );
    }
}
