/*
* @flow
*/

import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Camera from './camera';
import { postImage } from './cameraActions';
import ImagePreview from '../imagePreview/imagePreview';
import {
    yellowBanana,
    send,
    xBtn,
    numberOfTranings,
    streak,
} from '../../images/images';
import { width, deleteFile } from '../../utils/utils';
import Text from '../common/text';
import { NavigationActions } from 'react-navigation';
import UserImages from '../common/userImages';
import { Map } from 'immutable';
import FetchAllData from '../common/fetchAllData';
import { mainColor } from '../../theme/colors';

const LeftElement = ({ style = {}, source, number, imageStyle = {} }) => (
    <View
        style={{
            backgroundColor: 'rgba(28,37,42,0.65)',
            flexDirection: 'row',
            borderRadius: 6,
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: 10,
            ...style,
        }}>
        <Image style={{ marginRight: 5, ...imageStyle }} source={source} />
        <Text>{number}</Text>
    </View>
);

const TopBar = ({
    currentScore,
    userImages,
    isUser,
    userStreak,
    numberOfTrainings,
    weeklyTrainingGoal,
}) => (
    <View
        style={{
            padding: 10,
            flex: 1,
            flexDirection: 'row',
            width,
        }}>
        <View
            style={{
                marginTop: 10,
            }}>
            <LeftElement
                source={yellowBanana}
                imageStyle={{ width: 28, height: 28 }}
                number={currentScore}
            />
            <LeftElement
                source={streak}
                number={userStreak}
                style={{ marginVertical: 10 }}
            />
            <LeftElement
                source={numberOfTranings}
                number={`${numberOfTrainings} / ${weeklyTrainingGoal}`}
            />

        </View>
        <UserImages images={userImages} calculateOutlinedUser={isUser} />
    </View>
);
const ClickableElement = ({ image, onPress, style }) => (
    <TouchableOpacity
        onPress={onPress}
        style={{
            width: '50%',
            ...style,
        }}>
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
    showCamera = () => {
        deleteFile(this.state.data.path);
        this.modifyState(null);
    };
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
                      numberOfTrainings={this.props.numberOfTrainings}
                      userStreak={this.props.streak}
                      weeklyTrainingGoal={this.props.weeklyTrainingGoal}
                  />
              </Camera>;
    }
}
export default connect(({ user, unSeenImage, highscore }) => ({
    streak: user.get('streak'),
    numberOfTrainings: unSeenImage.get('numberOfImages'),
    id: user.get('id'),
    weeklyTrainingGoal: user.get('weeklyTraining'),
    progress: unSeenImage.get('numberOfImages') / user.get('weeklyTraining'),
    currentScore: highscore.getIn(['userHighScore', 'highscore']),
    userImages: highscore.get('highscore', new Map()).map(highscore => ({
        image: highscore.get('image'),
        id: highscore.get('userid'),
    })),
}))(CameraContainer);
