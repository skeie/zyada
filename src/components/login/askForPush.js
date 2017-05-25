import React, { Component, PropTypes } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { facebook, yellowBanana } from '../../images/images';
import Text from '../common/text';
import { mainColor } from '../../theme/colors';
import Button from '../common/button';

const Bottom = ({ onLogin, buttonText }) => (
    <Button onPress={onLogin} style={{ marginBottom: 50 }}>
        <Text>{buttonText}</Text>
    </Button>
);

class AskForPush extends Component {
    onAskForPush = () => {
        this.setState({
            isAskForPush: true,
        });
        this.props.askForPushPermison();
    };

    state = {
        isAskForPush: false,
    };

    render() {
        const onNextBtnClicked = this.state.isAskForPush
            ? this.props.goToNumberOfWorkouts
            : this.onAskForPush;

        const buttonText = this.state.isAskForPush
            ? 'Next'
            : 'Show me the dialog 😎';
        return (
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    flexDirection: 'column',
                    flex: 1,
                    backgroundColor: 'white',
                }}>
                <Text
                    style={{
                        backgroundColor: 'transparent',
                        color: 'black',
                        textAlign: 'center',
                        fontSize: 31,
                        marginTop: 20,
                    }}>
                    Do you want to be the best?
                </Text>
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
                    <Text
                        style={{
                            backgroundColor: 'transparent',
                            color: 'black',
                            textAlign: 'center',
                            fontSize: 24,
                            marginTop: 20,
                        }}>
                        Then you need to allow us to send you push when you're friends have finished their workout
                    </Text>
                </View>
                <Bottom onLogin={onNextBtnClicked} buttonText={buttonText} />
            </View>
        );
    }
}
export default AskForPush;
