import React, { Component, PropTypes } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import BackgroundImage from '../common/backgroundImage';
import { facebook } from '../../images/images';
import Text from '../common/text';
class Login extends Component {
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
                        flexDirection: 'row',
                    }}
                    onPress={this.props.onLogin}>
                    <Image source={facebook} style={{ marginRight: 11 }} />
                    <Text style={{ color: 'white' }}>Login with Facebook</Text>
                </TouchableOpacity>
            </BackgroundImage>
        );
    }
}

export default Login;
