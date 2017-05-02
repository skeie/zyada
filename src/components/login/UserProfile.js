/**
 * @flow
 */

import React, { Component } from 'react';
import BackgroundImage from '../common/backgroundImage';
import {
    TextInput,
    Image,
    TouchableOpacity,
    View,
    Slider,
    KeyboardAvoidingView,
} from 'react-native';
import { checkedBtn } from '../../images/images';
import WeeklyTraining from './weeklyTraining';
import fonts from '../../utils/fonts';
import Text from '../common/text';
import Button from '../common/button';
const UserImage = ({ uri }) => (
    <Image
        source={{ uri }}
        style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            marginBottom: 20,
        }}
    />
);

const Username = ({ name, onChangeText, onFinish }) => (
    <View
        style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
        <Text style={{ color: 'black', fontSize: 20, paddingBottom: 54 }}>
            Set your nickname
        </Text>
        <TextInput
            value={name}
            onChangeText={onChangeText}
            underlineColorAndroid="transparent"
            autoFocus
            style={[
                {
                    textAlign: 'center',
                    color: 'black',
                    fontSize: 29,
                    height: 50,
                    backgroundColor: '#F7F8FA',
                    width: '80%',
                    borderRadius: 30,
                    alignSelf: 'center',
                    marginBottom: 20,
                },
                fonts('regular'),
            ]}
        />
        <Button onPress={onFinish}>
            <Text>Next</Text>
        </Button>
    </View>
);

class UserProfile extends Component {
    state = {
        name: this.props.name || '',
    };
    onChangeText = (name: String) => {
        this.setState({
            name,
        });
    };

    onFinish = () => this.props.onFinish(this.state.name);

    render() {
        const { url } = this.props;
        return (
            <KeyboardAvoidingView
                behavior="padding"
                keyboardVerticalOffset={0}
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                }}>
                <UserImage uri={url} />
                <Username
                    onFinish={this.onFinish}
                    onChangeText={this.onChangeText}
                    name={this.state.name}
                />
            </KeyboardAvoidingView>
        );
    }
}

export default UserProfile;
