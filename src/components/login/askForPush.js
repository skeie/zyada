import React, { Component, PropTypes } from 'react';
import { View, TouchableOpacity, Image, Animated, Easing } from 'react-native';
import { facebook, yellowBanana } from '../../images/images';
import Text from '../common/text';
import { mainColor } from '../../theme/colors';
import Button from '../common/button';

const Bottom = ({ onLogin, buttonText, animatedStyle }) => (
    <Animated.View style={animatedStyle}>
        <Button
            onPress={onLogin}
            style={{
                marginBottom: 50,
            }}>
            <Text style={{ textAlign: 'center', alignSelf: 'center' }}>
                {buttonText}
            </Text>
        </Button>
    </Animated.View>
);

class AskForPush extends Component {
    onAskForPush = () => {
        this.setState(
            {
                isAskForPush: true,
            },
            this.bounceUp,
        );
        this.props.askForPushPermison();
    };

    bounceUp = () => {
        Animated.timing(this.animation, {
            toValue: -20,
            duration: 1000,
            easing: Easing.bounce,
        }).start(this.bounceDown);
    };

    bounceDown = () => {
        Animated.timing(this.animation, {
            toValue: 0,
            duration: 1000,
            easing: Easing.bounce,
        }).start(this.bounceUp);
    };

    state = {
        isAskForPush: false,
    };

    animation = new Animated.Value(0);

    render() {
        const onNextBtnClicked = this.state.isAskForPush
            ? this.props.goToNumberOfWorkouts
            : this.onAskForPush;

        const buttonText = this.state.isAskForPush
            ? 'Next'
            : 'Show me the dialog 😎';

        const animatedStyle = {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            transform: [{ translateY: this.animation }],
        };
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
                <Bottom
                    onLogin={onNextBtnClicked}
                    buttonText={buttonText}
                    animatedStyle={animatedStyle}
                />
            </View>
        );
    }
}
export default AskForPush;
