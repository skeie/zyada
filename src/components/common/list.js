import React, { Component } from 'react';
import {
    FlatList,
    View,
    Image,
    TouchableOpacity,
    LayoutAnimation,
} from 'react-native';
import Text from './text';
import { yellowBanana, crown } from '../../images/images';
import { yellow, backgroundColor, mainColor } from '../../theme/colors';

const NO_OP = () => {};

const CustomLayoutLinear = {
    duration: 300,
    create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
    },
    update: {
        type: LayoutAnimation.Types.curveEaseInEaseOut,
    },
    delete: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
        duration: 10,
    },
};

const Crown = () =>
    <Image
        source={crown}
        style={{
            position: 'absolute',
            top: -35,
            left: 5,
        }}
    />;

const Highscore = ({
    name,
    highscore,
    isCurrentUser,
    image,
    isFirstPlace,
    expand = NO_OP,
    onPress = NO_OP,
    itemExpand,
    index,
}) => {
    return (
        <TouchableOpacity
            onPress={() => {
                onPress(index);
            }}
            activeOpacity={onPress === NO_OP ? 0 : 0.2}
            style={{
                flexDirection: 'column',
                width: '100%',
                backgroundColor: 'transparent',
                marginTop: 10,
            }}>
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
                    source={{ uri: image }}
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
                <View>

                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
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
            {itemExpand && expand(name)}
        </TouchableOpacity>
    );
};

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

class List extends Component {
    static defaultProps = {
        isFirstPlace: false,
    };

    onToggleItemExpand = itemPressed => {
        LayoutAnimation.configureNext(CustomLayoutLinear);

        this.setState(({ itemExpand }) => {
            if (itemExpand === itemPressed) {
                return {
                    itemExpand: -1,
                };
            } else {
                return {
                    itemExpand: itemPressed,
                };
            }
        });
    };

    state = {
        itemExpand: -1,
    };

    renderSepartor = () =>
        <View
            style={{
                width: '75%',
                height: 1,
                backgroundColor: 'black',
                marginLeft: '25%',
            }}
        />;

    render() {
        const {
            isFirstPlace,
            userPosition,
            data,
            expand,
            onPress,
            renderFooter,
        } = this.props;
        return (
            <FlatList
                data={data}
                style={{ paddingHorizontal: 10 }}
                renderItem={({ item, index }) =>
                    <Highscore
                        {...item}
                        isCurrentUser={
                            index === userPosition - 1 //removes the first place and the index starts at 0
                        }
                        isFirstPlace={isFirstPlace && index === 0}
                        expand={expand}
                        onPress={this.onToggleItemExpand}
                        itemExpand={this.state.itemExpand === index}
                        index={index}
                    />}
                keyExtractor={item => item.name}
                ItemSeparatorComponent={this.renderSepartor}
                ListFooterComponent={renderFooter}
            />
        );
    }
}

export default List;
