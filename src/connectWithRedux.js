/**
 *  @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { connect } from 'react-redux';
import Routes from './components/router/routes';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { baseURl } from './utils/fetch';

export default class App extends Component {
    client = {};
    static defaultProps = {
        initialRouteName: '',
    };

    componentWillMount() {
        this.setupGraphql();
    }

    setupGraphql = () => {
        const networkInterface = createNetworkInterface({
            uri: `${baseURl}/graphql`,
        });
        this.client = new ApolloClient({
            networkInterface,
        });
        networkInterface.use([
            {
                applyMiddleware(req, next) {
                    if (!req.options.headers) {
                        req.options.headers = {};
                    }
                    const jwt = store.getState().user.get('jwtToken');
                    if (jwt) {
                        req.options.headers.authorization = `Bearer ${jwt}`;
                    }
                    next();
                },
            },
        ]);
    };

    render() {
        return (
            <ApolloProvider client={this.client} store={store}>
                <Routes {...this.props} />
            </ApolloProvider>
        );
    }
}
