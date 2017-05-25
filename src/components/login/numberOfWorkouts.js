/**
 * @flow
 */

import React, { Component } from 'react';
import { View } from 'react-native';
import Text from '../common/text';
import { yellow, mainColor } from '../../theme/colors';
import Button from '../common/button';
import WeeklyTraining from './weeklyTraining';
const SliderValue = ({ selectedTrainingNumber, onChangeTrainingNumber }) => (
    <View style={{ width: '100%', alignItems: 'center' }}>
        <Text
            style={{
                backgroundColor: 'transparent',
                color: yellow,
                textAlign: 'center',
                fontSize: 118,
            }}>
            {selectedTrainingNumber}
        </Text>
        <Text
            style={{
                backgroundColor: 'transparent',
                color: '#758692',
                textAlign: 'center',
                fontSize: 23,
                marginBottom: 20,
            }}>
            times per week
        </Text>
        <WeeklyTraining
            onPress={onChangeTrainingNumber}
            selectedTrainingNumber={selectedTrainingNumber}
        />
    </View>
);

class NumberOfWorkouts extends Component {
    static defaultProps = {
        navigation: {
            state: {
                params: {},
            },
        },
    };

    state = {
        selectedTrainingNumber: 3,
    };

    onChangeTrainingNumber = (selectedTrainingNumber: number) => {
        this.setState({
            selectedTrainingNumber: Math.round(selectedTrainingNumber),
        });
    };

    finishOnboarding = () => {
        const { params } = this.props.navigation.state;
        params.onFinish
            ? params.onFinish(this.state.selectedTrainingNumber)
            : this.props.onFinish(this.state.selectedTrainingNumber);
    };

    render() {
        return (
            <View
                style={{
                    justifyContent: 'space-around',
                    flex: 1,
                    alignItems: 'center',
                    backgroundColor: 'white',
                }}>
                <Text
                    style={{
                        backgroundColor: 'transparent',
                        color: 'black',
                        textAlign: 'center',
                        fontSize: 31,
                    }}>
                    Set your workout goal
                </Text>
                <SliderValue
                    selectedTrainingNumber={this.state.selectedTrainingNumber}
                    onChangeTrainingNumber={this.onChangeTrainingNumber}
                />

                <Button onPress={this.finishOnboarding}>
                    <Text>Finish!</Text>
                </Button>
            </View>
        );
    }
}

export default NumberOfWorkouts;
