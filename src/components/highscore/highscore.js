import React, { Component } from 'react';
import Text from '../common/text';
import Background from '../common/backgroundImage';
import {
    View,
    Image,
    StyleSheet,
    ScrollView,
    InteractionManager,
    TouchableOpacity,
} from 'react-native';
import { yellowBanana, confetti, crown, arrowBack } from '../../images/images';
import { yellow, backgroundColor, mainColor } from '../../theme/colors';
import { height, BIG, SMALL, screenSize } from '../../utils/utils';

const divideHeight = screenSize === BIG ? 7 : 20;

const Highscore = ({
    name,
    highscore,
    isCurrentUser,
    index,
    url,
    isFirstPlace,
}) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                width: '100%',
                backgroundColor: 'transparent',
                marginTop: 10,
                alignItems: 'center',
                height: 100,
                justifyContent: 'space-between',
            }}>
            <UserImage
                source={{ uri: url }}
                style={{
                    borderColor: isCurrentUser ? yellow : mainColor,
                    borderWidth: 2,
                }}
                isFirstPlace={isFirstPlace}
            />
            <Text
                style={{
                    fontSize: 18,
                    color: isCurrentUser ? yellow : 'black',
                }}>
                {name}
            </Text>
            <View style={{ marginRight: 20 }}>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={yellowBanana}
                        style={{ marginRight: 10, width: 22, height: 22 }}
                    />
                    <Text
                        style={{
                            fontSize: 20,
                            color: isCurrentUser ? yellow : 'black',
                        }}>
                        {highscore}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const Bananas = ({ score }) =>
    <View
        style={{
            flexDirection: 'row',
            alignItems: 'center',
        }}>
        <Image
            style={{ width: 24, height: 24, marginRight: 10 }}
            source={yellowBanana}
        />
        <Text style={{ backgroundColor: 'transparent', fontSize: 20 }}>
            {score}
        </Text>
    </View>;

const Crown = () =>
    <Image
        source={crown}
        style={{
            position: 'absolute',
            top: -35,
            left: 6,
        }}
    />;

const UserImage = ({ source, style = {}, isFirstPlace }) =>
    <View>

        <Image
            style={{
                height: 70,
                width: 70,
                borderRadius: 35,
                ...style,
            }}
            source={source}
        />
        {isFirstPlace && <Crown />}
    </View>;

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
                    <TouchableOpacity
                        style={{
                            marginLeft: 10,
                            marginTop: 10,
                            marginBottom: 50,
                        }}
                        onPress={this.props.goBack}>
                        <Image source={arrowBack} />
                    </TouchableOpacity>

                    <ScrollView
                        contentContainerStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        style={{
                            paddingLeft: 30,
                        }}>
                        {this.props.highscores.map((highscore, index) =>
                            <Highscore
                                isFirstPlace={index === 0}
                                isCurrentUser={
                                    index === this.props.userPosition - 1 //removes the first place and the index starts at 0
                                }
                                name={highscore.name}
                                key={highscore.userid}
                                highscore={highscore.highscore}
                                index={index}
                                url={highscore.image}
                            />,
                        )}
                    </ScrollView>
                </Image>
            </View>
        );
    }
}

export default Highscores;
