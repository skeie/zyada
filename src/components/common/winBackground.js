import React, { Component } from 'react';

import { View, Image } from 'react-native';
import { winScreen, yellowBanana } from '../../images/images';
import Text from '../common/text';
import RainingBananas from './rainingBananas';
import Background from './backgroundImage';
const StyledText = ({ children }) => (
    <Text
        style={{
            backgroundColor: 'transparent',
            fontSize: 29,
            textAlign: 'center',
        }}>
        {children}
    </Text>
);
export default class WinBackground extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bananas: [],
        };
    }

    render() {
        return (
            <Background>
                <RainingBananas score={this.props.score} />
                <StyledText>Zyada!</StyledText>
                <StyledText>
                    You just won {this.props.score} bananas!!
                </StyledText>
            </Background>
        );
    }
}
