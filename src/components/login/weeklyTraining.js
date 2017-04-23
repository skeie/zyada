import React, { Component } from 'react';
import Text from '../common/text';
import { View, TouchableOpacity } from 'react-native';
import { yellow } from '../../theme/colors';
import { getShadowStyle } from '../../utils/utils';
class Element extends Component {
    onPress = () => {
        this.props.onPress(this.props.value);
    };

    render() {
        const { isSelected, value } = this.props;
        return (
            <View
                style={{
                    width: value > 4 ? '33%' : '25%',
                    alignItems: value > 4 ? 'center' : 'flex-start',
                }}>
                <TouchableOpacity
                    onPress={this.onPress}
                    style={{
                        marginHorizontal: 30,
                        marginTop: 20,
                        borderRadius: 50,
                        borderWidth: 3,
                        borderColor: isSelected ? yellow : 'white',
                        width: 42,
                        height: 42,
                        justifyContent: 'center',
                        alignItems: 'center',
                        ...getShadowStyle({
                            shadowColor: 'transparent',
                            shadowOpacity: 0.50,
                            shadowRadius: 0,
                            height: 5,
                            width: 5,
                            elevation: 5,
                        }),
                    }}>
                    <Text
                        style={{
                            fontSize: 25,
                            backgroundColor: 'transparent',
                            color: isSelected ? yellow : 'white',
                        }}>
                        {value}
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
                    backgroundColor: 'transparent',
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
