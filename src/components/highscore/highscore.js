import React, { Component } from 'react';
import Text from '../common/text';
import Background from '../common/backgroundImage';
import { View, Image } from 'react-native';
import { banana, yellowBanana } from '../../images/images';
import { yellow } from '../../theme/colors';
const Highscore = ({ name, highscore, isCurrentUser }) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                backgroundColor: 'transparent',
            }}>
            <Text
                style={{
                    fontSize: 29,
                    color: isCurrentUser ? yellow : 'white',
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
        userId: 1,
    };
    render() {
        console.log(this.props.highscores, 'sap');
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
                    {this.props.highscores.map(highscore => (
                        <Highscore
                            isCurrentUser={
                                highscore.get('id') === this.props.userId
                            }
                            name={highscore.get('name')}
                            key={highscore.get('id')}
                            highscore={highscore.get('highscore')}
                        />
                    ))}
                </View>
            </Background>
        );
    }
}

export default Highscores;
