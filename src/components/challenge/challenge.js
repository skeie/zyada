/**
 * @flow
 */

import React, { Component } from 'react';
import { View, Image, TouchableOpacity, TextInput } from 'react-native';
import List from '../common/list';
import HighscoreGQL from '../highscore/highscoreGQL';
import { confetti, arrowRight } from '../../images/images';
import { yellow } from '../../theme/colors';
import Text from '../common/text';
import fonts from '../../utils/fonts';
import Button from '../common/button';

class Challenge extends Component {
    state = {
        challengeText: '',
    };

    onChallengeTextChange = challengeText => this.setState({ challengeText });

    renderExpand = name =>
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ width: '30%', marginRight: 5 }}>
                    Describe the challenge for {name}
                </Text>
                <TextInput
                    value={this.state.challengeText}
                    onChangeText={this.onChallengeTextChange}
                    underlineColorAndroid="transparent"
                    autoFocus
                    multiline
                    style={[
                        {
                            padding: 6,
                            color: 'black',
                            height: 50,
                            backgroundColor: '#F7F8FA',
                            borderRadius: 20,
                            marginBottom: 20,
                            width: '70%',
                        },
                        fonts('regular'),
                    ]}
                />
            </View>
            <Button style={{ backgroundColor: yellow }}>
                <Text>Challenge {name}! 💪</Text>
            </Button>
        </View>;

    renderFooter = () =>
        <View style={{ marginTop: 50, alignItems: 'center' }}>
            <Text style={{ color: 'black' }}>
                Send a challenge to a team mate. In order to complete the
                challenge,
                your team mate has to send a picture of that proves the
                challenge is done to you wihting 24 hours.
            </Text>

            <Text style={{ marginVertical: 5, color: 'black' }}>
                Happy Challenging 🏋️
            </Text>
        </View>;
    render() {
        const { loading, highscore } = this.props.data;
        if (loading) return <View />;
        const copyHighscore = [...highscore.highscores];
        const userPosition = parseInt(highscore.position, 10) - 1;
        copyHighscore.splice(userPosition, 1);
        // TODO: GET API THAT GETS USR FOR CHALLENGE DONT HAVE TO FILTER HER
        return (
            <Image
                source={confetti}
                style={{ flex: 1, width: '100%', paddingHorizontal: 20 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: 50,
                    }}>
                    <View style={{ flex: 1 }} />
                    <Text
                        style={{
                            backgroundColor: 'transparent',
                            fontSize: 22,
                            color: yellow,
                            flex: 1,
                        }}>
                        Challenge
                    </Text>
                    <TouchableOpacity
                        style={{ flex: 1, alignItems: 'flex-end' }}
                        onPress={this.props.goBack}>
                        <Image source={arrowRight} />
                    </TouchableOpacity>
                </View>
                <List
                    data={copyHighscore}
                    expand={this.renderExpand}
                    renderFooter={this.renderFooter}
                />

            </Image>
        );
    }
}
export default HighscoreGQL(Challenge);
