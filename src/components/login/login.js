import React, { Component, PropTypes } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { facebook, yellowBanana } from '../../images/images';
import Text from '../common/text';
import { mainColor } from '../../theme/colors';
import Button from '../common/button';

const Bottom = ({ onLogin }) => (
    <Button onPress={onLogin} style={{ marginBottom: 50 }}>
        <Image source={facebook} style={{ marginRight: 11 }} />
        <Text style={{ color: 'white', textAlign: 'center' }}>
            Login with Facebook
        </Text>
    </Button>
);

class Login extends Component {
    render() {
        return (
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    flexDirection: 'column',
                    flex: 1,
                    backgroundColor: 'white',
                }}>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Image
                        source={yellowBanana}
                        style={{ alignSelf: 'center' }}
                    />
                </View>
                <Bottom onLogin={this.props.onLogin} />
            </View>
        );
    }
}

export default Login;
