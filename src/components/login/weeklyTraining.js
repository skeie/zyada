import React, { Component } from 'react';
import Text from '../common/text';
import { View, TouchableOpacity } from 'react-native';
import { yellow, mainColor } from '../../theme/colors';
import { getShadowStyle } from '../../utils/utils';
class Element extends Component {
    onPress = () => {
        this.props.onPress(this.props.value);
    };

    getContainerStyle = value => {
        switch (value) {
            case 4:
            case 1:
                return 'flex-end';
            case 6:
            case 2:
            case 5:
                return 'center';
            case 7:
            case 3:
                return 'flex-start';
            default:
                return 'center';
        }
    };
    render() {
        const { isSelected, value } = this.props;
        return (
            <View
                style={{
                    width: value > 3 ? '25%' : '33%',
                    alignItems: this.getContainerStyle(value),
                    backgroundColor: 'transparent',
                }}>
                <TouchableOpacity
                    onPress={this.onPress}
                    style={{
                        marginTop: 20,
                        borderRadius: 50,
                        borderWidth: 1,
                        borderColor: isSelected ? mainColor : '#B7C5CB',
                        backgroundColor: isSelected ? mainColor : 'transparent',
                        width: 42,
                        height: 42,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Text
                        style={{
                            fontSize: 25,
                            color: isSelected ? 'white' : '#B7C5CB',
                        }}>
                        {value.toString()}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const WeeklyTraining = ({ onPress, selectedTrainingNumber }) => {
    return (
        <View>
            <Text
                style={{
                    textAlign: 'center',
                    marginVertical: 20,
                    color: 'white',
                }}>
                Set your weekly training goal
            </Text>

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    flexWrap: 'wrap',
                }}>
                {[1, 2, 3, 4, 5, 6, 7].map(value => (
                    <Element
                        key={value}
                        value={value}
                        onPress={onPress}
                        isSelected={selectedTrainingNumber === value}
                    />
                ))}
            </View>
        </View>
    );
};

export default WeeklyTraining;
