import React, { Component } from 'react';
import { Image } from 'react-native';
class ImagePreview extends Component {
    render() {
        return (
            <Image
                source={{ uri: this.props.uri }}
                style={{
                    flex: 1,
                    alignSelf: 'stretch',
                    width: undefined,
                    height: undefined,
                }}>
                {this.props.children}
            </Image>
        );
    }
}

export default ImagePreview;
