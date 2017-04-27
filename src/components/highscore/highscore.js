import React, { Component } from 'react';
import Text from '../common/text';
import Background from '../common/backgroundImage';
import { View, Image } from 'react-native';
import { banana, yellowBanana } from '../../images/images';
import { yellow } from '../../theme/colors';
const Highscore = ({ name, highscore, isCurrentUser, index, sap }) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                backgroundColor: 'transparent',
                marginTop: 10,
            }}>
            <Text
                style={{
                    fontSize: 29,
                    color: isCurrentUser ? yellow : 'white',
                    width: '60%',
                }}>
                {name}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                    source={isCurrentUser ? yellowBanana : banana}
                    style={{ marginRight: 10, width: 22, height: 22 }}
                />
                <Text
                    style={{
                        fontSize: 29,
                        color: isCurrentUser ? yellow : 'white',
                        width: '40%',
                    }}>
                    {highscore}
                </Text>
            </View>
        </View>
    );
};

class Highscores extends Component {
    static defaultProps = {
        highscores: [],
        userPosition: 1,
    };
    render() {
        return (
            <Background style={{ padding: 40 }}>
                <Text
                    style={{
                        fontSize: 40,
                        backgroundColor: 'transparent',
                        position: 'absolute',
                        top: 28,
                        right: '30%',
                    }}>
                    Highscore
                </Text>
                <View style={{ position: 'absolute', top: 150, width: '100%' }}>
                    {this.props.highscores.map((highscore, index) => (
                        <Highscore
                            isCurrentUser={
                                index === this.props.userPosition - 1
                            }
                            name={highscore.get('name')}
                            key={highscore.get('userid')}
                            highscore={highscore.get('highscore')}
                            index={index}
                            sap={this.props.userPosition}
                        />
                    ))}
                </View>
            </Background>
        );
    }
}

export default Highscores;
