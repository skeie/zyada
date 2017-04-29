import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { errorScreen, failBanana } from '../../images/images';
import Text from './text';

const StyledText = ({ children }) => (
    <Text
        style={{
            marginTop: 25,
            fontSize: 29,
            backgroundColor: 'transparent',
        }}>
        {children}
    </Text>
);

class RedBackground extends Component {
    render() {
        return (
            <Image
                style={{
                    flex: 1,
                    width: undefined,
                    height: undefined,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'stretch',
                    padding: 40,
                }}
                source={errorScreen}
                resizeMode="contain">
                <Image source={failBanana} />
                <StyledText>Woops…!</StyledText>
                <StyledText>
                    You just lost to {this.props.name}
                </StyledText>
                <StyledText>
                    🤙
                </StyledText>
            </Image>
        );
    }
}
export default RedBackground;
