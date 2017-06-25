import React, { Component } from 'react';
import Text from '../common/text';
import Background from '../common/backgroundImage';
import {
    View,
    Image,
    StyleSheet,
    InteractionManager,
    TouchableOpacity,
} from 'react-native';
import { yellowBanana, confetti, crown, arrowBack } from '../../images/images';
import { height, BIG, SMALL, screenSize } from '../../utils/utils';
import List from '../common/list';
import { yellow } from '../../theme/colors';

const divideHeight = screenSize === BIG ? 7 : 20;

class Highscores extends Component {
    static defaultProps = {
        highscores: [],
        userPosition: 1,
    };
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                }}>
                <Image source={confetti} style={{ flex: 1, width: '100%' }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            height: 50,
                        }}>
                        <TouchableOpacity
                            style={{
                                marginLeft: 10,
                            }}
                            onPress={this.props.goBack}>
                            <Image source={arrowBack} />
                        </TouchableOpacity>
                        <Text
                            style={{
                                backgroundColor: 'transparent',
                                fontSize: 22,
                                color: yellow,
                            }}>
                            Highscore
                        </Text>
                        <View />
                    </View>
                    <List
                        data={this.props.highscores}
                        userPosition={this.props.userPosition}
                        isFirstPlace
                    />
                </Image>
            </View>
        );
    }
}

export default Highscores;
