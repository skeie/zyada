/*
* @flow
*/

import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Camera from './camera';
import { postImage } from './cameraActions';
import ImagePreview from '../imagePreview/imagePreview';
import { yellowBanana, send, xBtn } from '../../images/images';
import { width, deleteFile } from '../../utils/utils';
import Text from '../common/text';
import { NavigationActions } from 'react-navigation';

const TopBar = ({ currentPosition, currentScore }) => (
    <View
        style={{
            justifyContent: 'space-between',
            padding: 10,
            flex: 1,
            flexDirection: 'row',
            width,
        }}>
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'center',
                height: 40,
            }}>
            <Image style={{ width: 38, height: 38 }} source={yellowBanana} />
            <Text style={{ alignSelf: 'center', marginHorizontal: 5 }}>X</Text>
            <Text style={{ alignSelf: 'center', fontSize: 29 }}>
                {currentScore || 0}
            </Text>
        </View>
        <Text
            style={{
                color: 'white',
                fontSize: 29,
                backgroundColor: 'transparent',
            }}>
            #{currentPosition || '😢'}
        </Text>
    </View>
);
const ClickableElement = ({ image, onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <Image source={image} />
    </TouchableOpacity>
);
const SendBtn = ({ onPostImage, onXPressed }) => (
    <View
        style={{
            position: 'absolute',
            bottom: 20,
            width,
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 20,
        }}>
        <ClickableElement image={xBtn} onPress={onXPressed} />
        <ClickableElement image={send} onPress={onPostImage} />
    </View>
);
class CameraContainer extends Component {
    state = {
        data: null,
    };
    onPictureTaken = data => {
        this.modifyState(data);
    };
    onPostImage = () => {
        this.props
            .dispatch(postImage(this.props.id, this.state.data))
            .then(() => {
                if (this.state.data) {
                    deleteFile(this.state.data.path);
                }
                this.showCamera();
            });
    };
    showCamera = () => this.modifyState(null);
    modifyState = data => this.setState({ data });
    render() {
        return this.state.data
            ? <ImagePreview uri={this.state.data.path}>
                  <TopBar
                      currentPosition={this.props.currentPosition}
                      currentScore={this.props.currentScore}
                  />
                  <SendBtn
                      onPostImage={this.onPostImage}
                      onXPressed={this.showCamera}
                  />
              </ImagePreview>
            : <Camera
                  onPictureTaken={this.onPictureTaken}
                  progress={this.props.progress}>
                  <TopBar
                      currentPosition={this.props.currentPosition}
                      currentScore={this.props.currentScore}
                  />
              </Camera>;
    }
}
export default connect(({ user, unSeenImage, highscore }) => ({
    id: user.get('id'),
    progress: unSeenImage.get('numberOfImages') / user.get('weeklyTraining'),
    currentScore: highscore.getIn(['userHighScore', 'highscore']),
    currentPosition: highscore.getIn(['userHighScore', 'position']),
}))(CameraContainer);
