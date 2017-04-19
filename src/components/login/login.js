import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { facebookLogin } from './facebookLogin';
import { connect } from 'react-redux';
import { login } from '../user/userActions';
class Login extends Component {
    onLogin = async () => {
        try {
            const {
                facebookData: { name, email, picture: { data: { url } } },
            } = await facebookLogin();
            this.props.dispatch(login({ name, url, email }));
        } catch (e) {
            console.log('error', e);
        }
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text
                    style={{ flex: 1, backgroundColor: 'red' }}
                    onPress={this.onLogin}>
                    SAP
                </Text>
            </View>
        );
    }
}

Login.propTypes = {};

export default connect()(Login);
