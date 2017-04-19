/*
* @flow
*/

import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Camera from './camera';
import { postImage } from './cameraActions';
import ImagePreview from './imagePreview';
import { banana, send } from '../../images/images';
import { width } from '../../utils/utils';

const TopBar = () => (
    <View
        style={{
            justifyContent: 'space-between',
            padding: 10,
            flex: 1,
            flexDirection: 'row',
            width,
        }}>
        <Image source={banana} />
        <Text style={{ color: 'white', fontSize: 20 }}>10th</Text>
    </View>
);

const SendBtn = ({ onPostImage }) => (
    <TouchableOpacity
        style={{
            right: 20,
            bottom: 20,
            position: 'absolute',
        }}
        onPress={onPostImage}>
        <Image source={send} />
    </TouchableOpacity>
);

class CameraContainer extends Component {
    state = {
        data: null,
    };

    onPictureTaken = data => {
        this.modifyState(data)
    };

    onPostImage = () => {
        this.props.dispatch(postImage(this.props.id, this.state.data));
        this.modifyState(null);
    };

    modifyState = data => this.setState({data})

    render() {
        return this.state.data
            ? <ImagePreview uri={this.state.data.path}>
                  <TopBar />
                  <SendBtn onPostImage={this.onPostImage} />
              </ImagePreview>
            : <Camera onPictureTaken={this.onPictureTaken}>
                  <TopBar />
              </Camera>;
    }
}

export default connect(({ user }) => ({
    id: user.get('id') || 1337,
}))(CameraContainer);
