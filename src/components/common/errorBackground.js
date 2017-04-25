import React, { Component } from 'react';
import { Image } from 'react-native';
import { errorScreen, failBanana } from '../../images/images';
import Text from './text';
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
                }}
                source={errorScreen}
                resizeMode="contain">
                <Image source={failBanana}/>
                <Text style={{ marginTop: 25, backgroundColor: 'transparent', fontSize: 29 }}>
                    Woops…!
                    You just lost 🤙
                </Text>
            </Image>
        );
    }
}
export default RedBackground;
