import React, { Component } from 'react';
import Text from '../common/text';
import Background from '../common/backgroundImage';
import {
    View,
    Image,
    StyleSheet,
    ScrollView,
    InteractionManager,
} from 'react-native';
import { yellowBanana, confetti, crown, arrowBack } from '../../images/images';
import { yellow, backgroundColor, mainColor } from '../../theme/colors';
import { height, BIG, SMALL, screenSize } from '../../utils/utils';

const divideHeight = screenSize === BIG ? 7 : 20;

const Highscore = ({ name, highscore, isCurrentUser, index, url }) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                width: '100%',
                backgroundColor: 'transparent',
                marginTop: 10,
                alignItems: 'center',
                height: 100,
            }}>
            <UserImage
                source={{ uri: url }}
                style={{
                    borderColor: isCurrentUser ? yellow : mainColor,
                    borderWidth: 2,
                }}
            />
            <View style={{ marginLeft: 20 }}>
                <Text
                    style={{
                        fontSize: 18,
                        color: isCurrentUser ? yellow : 'black',
                    }}>
                    {name}
                </Text>
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
            left: 18,
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

class FirstPlace extends Component {
    render() {
        const { firstPlace, isCurrentUser, goBack } = this.props;
        return (
            <Image source={confetti} style={{ flex: 1, width: '100%' }}>
                <Image
                    style={{ marginLeft: 10, marginTop: 10 }}
                    source={arrowBack}
                    onPress={goBack}
                />
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        marginTop: 20,
                        width: '100%',
                    }}>
                    <UserImage
                        source={{ uri: firstPlace.image }}
                        style={{
                            borderColor: isCurrentUser
                                ? yellow
                                : backgroundColor,
                            borderWidth: 4,
                            height: 95,
                            width: 95,
                            borderRadius: 47,
                        }}
                        isFirstPlace
                    />
                    <Text
                        style={{
                            marginVertical: 20,
                            backgroundColor: 'transparent',
                            fontSize: 28,
                            color: isCurrentUser ? yellow : backgroundColor,
                        }}>
                        {firstPlace.name}
                    </Text>
                    <Bananas score={firstPlace.highscore} />
                </View>
            </Image>
        );
    }
}

class Highscores extends Component {
    static defaultProps = {
        highscores: [],
        userPosition: 1,
    };
    render() {
        const firstPlace = this.props.highscores[0];
        const highscores = this.props.highscores.slice(1);
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                }}>
                <FirstPlace
                    firstPlace={firstPlace}
                    isCurrentUser={1 === this.props.userPosition}
                    goBack={this.props.goBack}
                />
                <ScrollView
                    style={{
                        width: '100%',
                        paddingLeft: 30,
                        backgroundColor: backgroundColor,
                    }}>
                    {highscores.map((highscore, index) =>
                        <Highscore
                            isCurrentUser={
                                index === this.props.userPosition - 2 //removes the first place and the index starts at 0
                            }
                            name={highscore.name}
                            key={highscore.userid}
                            highscore={highscore.highscore}
                            index={index}
                            url={highscore.image}
                        />,
                    )}
                </ScrollView>
            </View>
        );
    }
}

export default Highscores;
