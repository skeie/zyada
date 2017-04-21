/**
 * @flow
 */

import React, { Component } from 'react';
import BackgroundImage from '../common/BackgroundImage';
import { TextInput, Image, TouchableOpacity, View } from 'react-native';
import { checkedBtn } from '../../images/images';
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
            <BackgroundImage>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                    }}>
                    <Image
                        source={{ uri: url }}
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: 40,
                            marginBottom: 20,
                        }}
                    />
                    <View
                        style={{
                            borderBottomColor: 'white',
                            borderBottomWidth: 6,
                            height: 50,
                            width: '70%'
                        }}>
                        <TextInput
                            value={this.state.name}
                            onChangeText={this.onChangeText}
                            style={{
                                textAlign: 'center',
                                color: 'white',
                                fontSize: 29,
                                height: 50,
                            }}
                        />
                    </View>
                </View>
                <TouchableOpacity
                    style={{ marginBottom: 20 }}
                    onPress={this.onFinish}>
                    <Image source={checkedBtn} />
                </TouchableOpacity>
            </BackgroundImage>
        );
    }
}

export default UserProfile;
