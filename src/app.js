import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store, loadOfflineData } from './store';
require('./utils/onRun');
import { connect } from 'react-redux';
import { StatusBar } from 'react-native';
import Routes from './components/router/renderScene';
export default class App extends Component {
    constructor(props) {
        super(props);
        StatusBar.setHidden(true);
        this.state = {
            loaded: false,
        };
    }

    shouldComponentUpdate(nextProps, { loaded }) {
        return loaded;
    }

    componentDidMount() {
        loadOfflineData().finally(() => {
            this.setState({
                loaded: true,
            });
        });
    }

    render() {
        if (!this.state.loaded) return null;
        return (
            <Provider store={store}>
                <Routes />
            </Provider>
        );
    }
}
