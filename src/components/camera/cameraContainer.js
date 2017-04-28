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
import UserImages from '../common/userImages';
import { Map } from 'immutable';
import FetchAllData from '../common/fetchAllData';
const TopBar = ({ currentScore, userImages, isUser }) => (
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
            <Image style={{ width: 28, height: 28 }} source={yellowBanana} />
            <Text style={{ alignSelf: 'center', marginHorizontal: 5 }}>X</Text>
            <Text style={{ alignSelf: 'center', fontSize: 20 }}>
                {currentScore || 0}
            </Text>
        </View>
        <UserImages images={userImages} calculateOutlinedUser={isUser} />
    </View>
);
const ClickableElement = ({ image, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={{ width: '50%', ...style }}>
        <Image source={image} />
    </TouchableOpacity>
);
const BottomBar = ({ onPostImage, onXPressed }) => (
    <View
        style={{
            position: 'absolute',
            bottom: 20,
            width,
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 20,
            alignItems: 'center',
        }}>
        <ClickableElement image={xBtn} onPress={onXPressed} />
        <ClickableElement
            image={send}
            onPress={onPostImage}
            style={{ alignItems: 'flex-end' }}
        />
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
            }); //Assume everything goes ok, since this is just a prototype
        this.showCamera();
    };
    showCamera = () => this.modifyState(null);
    modifyState = data => this.setState({ data });
    isUser = ({ data }) => {
        return data.id === this.props.id;
    };
    render() {
        return this.state.data
            ? <ImagePreview uri={this.state.data.path}>
                  <BottomBar
                      onPostImage={this.onPostImage}
                      onXPressed={this.showCamera}
                  />
              </ImagePreview>
            : <Camera
                  onPictureTaken={this.onPictureTaken}
                  progress={this.props.progress}>
                  <TopBar
                      userImages={this.props.userImages}
                      currentScore={this.props.currentScore}
                      isUser={this.isUser}
                  />
              </Camera>;
    }
}
export default connect(({ user, unSeenImage, highscore }) => ({
    id: user.get('id'),
    progress: unSeenImage.get('numberOfImages') / user.get('weeklyTraining'),
    currentScore: highscore.getIn(['userHighScore', 'highscore']),
    userImages: highscore.get('highscore', new Map()).map(highscore => ({
        image: highscore.get('image'),
        id: highscore.get('userid'),
    })),
}))(CameraContainer);
