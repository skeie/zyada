import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { facebookLogin } from './facebookLogin';
import { connect } from 'react-redux';
import { login } from '../user/userActions';
import BackgroundImage from '../common/BackgroundImage';
import { facebook } from '../../images/images';
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
            <BackgroundImage>
                <TouchableOpacity
                    style={{
                        borderRadius: 100,
                        borderWidth: 6,
                        borderColor: 'white',
                        width: '80%',
                        height: 50,
                        backgroundColor: 'transparent',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}
                    onPress={this.onLogin}>
                    <Image source={facebook} style={{marginRight: 11}} />
                    <Text style={{ color: 'white' }}>Login with Facebook</Text>
                </TouchableOpacity>
            </BackgroundImage>
        );
    }
}

Login.propTypes = {};

export default connect()(Login);
