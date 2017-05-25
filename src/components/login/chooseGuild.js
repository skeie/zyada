import React, { Component } from 'react';
import { FlatList, View, Image, TouchableOpacity } from 'react-native';
import Text from '../common/text';
import { mainColor, yellow } from '../../theme/colors';
import Button from '../common/button';
import { add } from '../../images/images';

const GuildElement = ({
    name,
    size,
    containerStyle = {},
    textStyle = {},
    onElementSelected,
    isSelected,
}) => (
    <TouchableOpacity onPress={onElementSelected}>
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 75,
                backgroundColor: isSelected ? mainColor : 'transparent',
                ...containerStyle,
            }}>
            <Text
                style={{
                    width: '50%',
                    textAlign: 'center',
                    color: 'black',
                    ...textStyle,
                }}>
                {name}
            </Text>
            <Text
                style={{
                    width: '50%',
                    textAlign: 'center',
                    color: yellow,
                    ...textStyle,
                }}>
                {size}
            </Text>
        </View>
    </TouchableOpacity>
);

const Separator = () => (
    <View style={{ borderWidth: 1, borderColor: mainColor }} />
);

const GuildView = ({ guilds, onElementSelected, selectedIndex }) => (
    <View style={{ height: '80%' }}>
        <GuildElement
            name="Name"
            size="Team Size"
            containerStyle={{ marginTop: 20 }}
            textStyle={{ fontSize: 24 }}
        />
        <FlatList
            data={guilds.toArray()}
            ItemSeparatorComponent={() => <Separator />}
            ListHeaderComponent={() => <Separator />}
            ListFooterComponent={() => <Separator />}
            renderItem={({ item, index }) => {
                return (
                    <GuildElement
                        isSelected={selectedIndex === index}
                        key={index}
                        onElementSelected={onElementSelected.bind(
                            null,
                            index,
                            item.get('id'),
                        )}
                        name={item.get('name')}
                        size={item.get('size') || 0}
                    />
                );
            }}
        />
    </View>
);

class ChooseGuild extends Component {
    state = {
        selectedIndex: null,
        id: null,
    };

    onElementSelected = (selectedIndex, id) => {
        this.setState({
            selectedIndex,
            id,
        });
    };

    onNextPressed = () => {
        this.props.setGuild(this.state.id);
    };

    render() {
        return (
            <View
                style={{
                    alignItems: 'center',
                }}>
                <Text
                    style={{
                        backgroundColor: 'transparent',
                        color: 'black',
                        textAlign: 'center',
                        fontSize: 31,
                        marginTop: 20,
                    }}>
                    Choose your team
                </Text>
                <GuildView
                    guilds={this.props.guilds}
                    onElementSelected={this.onElementSelected}
                    {...this.state}
                />
                {/*<Image source={add} />*/}

                <Button onPress={this.onNextPressed}>
                    <Text>Next</Text>
                </Button>
            </View>
        );
    }
}

export default ChooseGuild;
