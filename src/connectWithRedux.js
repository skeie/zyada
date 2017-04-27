import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store, loadOfflineData } from './store';
import { connect } from 'react-redux';
import Routes from './components/router/renderScene';

export default class App extends Component {
    static defaultProps = {
        initialRouteName: '',
    };
    constructor(props) {
        super(props);
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
                <Routes initialRouteName={this.props.initialRouteName} />
            </Provider>
        );
    }
}
