/**
 * @flow
 */

import React, { Component } from 'react';
import BackgroundImage from '../common/backgroundImage';
import { TextInput, Image, TouchableOpacity, View } from 'react-native';
import { checkedBtn } from '../../images/images';
import Text from '../common/text';
import WeeklyTraining from './weeklyTraining';
import fonts from '../../utils/fonts';
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

const Username = ({ name, onChangeText }) => (
    <View
        style={{
            borderBottomColor: 'white',
            borderBottomWidth: 6,
            height: 50,
            width: '70%',
        }}>
        <TextInput
            value={name}
            onChangeText={onChangeText}
            underlineColorAndroid="transparent"
            style={[
                {
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 29,
                    height: 50,
                },
                fonts('regular'),
            ]}
        />
    </View>
);

class UserProfile extends Component {
    state = {
        name: this.props.name || '',
        selectedTrainingNumber: 3,
    };
    onChangeText = (name: String) => {
        this.setState({
            name,
        });
    };

    onChangeTrainingNumber = (selectedTrainingNumber: number) =>
        this.setState({ selectedTrainingNumber });

    onFinish = () => this.props.onFinish(this.state);

    render() {
        const { url } = this.props;
        return (
            <BackgroundImage>
                <View
                    style={{
                        flex: 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                    }}>
                    <UserImage uri={url} />
                    <Username
                        onChangeText={this.onChangeText}
                        name={this.state.name}
                    />
                    <WeeklyTraining
                        onPress={this.onChangeTrainingNumber}
                        selectedTrainingNumber={
                            this.state.selectedTrainingNumber
                        }
                    />
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
