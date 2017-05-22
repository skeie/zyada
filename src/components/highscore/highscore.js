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
import { yellowBanana, confetti, crown } from '../../images/images';
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

const Bananas = ({ score }) => (
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
    </View>
);

const UserImage = ({ source, style = {} }) => (
    <Image
        style={{
            height: 70,
            width: 70,
            borderRadius: 35,
            ...style,
        }}
        source={source}
    />
);

class FirstPlace extends Component {
    state = {
        top: null,
    };

    ref = {};

    // componentDidMount() {
    //     requestAnimationFrame(() => {
    //         this.ref.measure((ox, oy, width, height, px, py) => {
    //             this.setState({
    //                 top: height / 20,
    //             });
    //         });
    //     });
    // }

    onLayout = event => {
        this.setState({
            top: event.nativeEvent.layout.height / divideHeight,
        });
    };

    render() {
        const { firstPlace, isCurrentUser } = this.props;
        return (
            <Image source={confetti} style={{ flex: 1, width: '100%' }}>
                <View
                    ref={ref => (this.ref = ref)}
                    onLayout={this.onLayout}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        marginTop: 20,
                        width: '100%',
                    }}>
                    <UserImage
                        source={{ uri: firstPlace.get('image') }}
                        style={{
                            borderColor: isCurrentUser
                                ? yellow
                                : backgroundColor,
                            borderWidth: 4,
                            height: 95,
                            width: 95,
                            borderRadius: 47,
                        }}
                    />

                    <Text
                        style={{
                            marginVertical: 20,
                            backgroundColor: 'transparent',
                            fontSize: 28,
                            color: isCurrentUser ? yellow : backgroundColor,
                        }}>
                        {firstPlace.get('name')}
                    </Text>
                    <Bananas score={firstPlace.get('highscore')} />
                    {this.state.top &&
                        <Image
                            source={crown}
                            style={{
                                position: 'absolute',
                                top: this.state.top,
                            }}
                        />}

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
        const firstPlace = this.props.highscores.get(0);
        const highscores = this.props.highscores.splice(0, 1);
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                }}>
                <FirstPlace
                    firstPlace={firstPlace}
                    isCurrentUser={1 === this.props.userPosition}
                />
                <ScrollView
                    style={{
                        width: '100%',
                        paddingLeft: 30,
                        backgroundColor: backgroundColor,
                    }}>
                    {highscores.map((highscore, index) => (
                        <Highscore
                            isCurrentUser={
                                index === this.props.userPosition - 2 //removes the first place and the index starts at 0
                            }
                            name={highscore.get('name')}
                            key={highscore.get('userid')}
                            highscore={highscore.get('highscore')}
                            index={index}
                            url={highscore.get('image')}
                        />
                    ))}
                </ScrollView>
            </View>
        );
    }
}

export default Highscores;
