/*
* @flow
*/

import React, { Component } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    InteractionManager,
} from 'react-native';
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
import UserImages from './UserImagesContainer';
import { Map } from 'immutable';
import FetchAllData from '../common/fetchAllData';
import { mainColor } from '../../theme/colors';
import { pushRoute } from '../router/routerCommon';
import { updateUser } from '../user/userActions';
import userGQL from '../user/userGQL';

const NO_OP = () => {};

const LeftElement = ({
    style = {},
    source,
    number,
    imageStyle = {},
    onPress,
}) =>
    <TouchableOpacity
        onPress={onPress || NO_OP}
        activeOpacity={onPress ? 0 : 1}
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
    </TouchableOpacity>;

const TopBar = ({
    currentScore,
    isUser,
    userStreak,
    numberOfTrainings,
    weeklyTrainingGoal,
    goToHighscore,
    goToEditNumberOfWeekWorkouts,
    goBack,
    goToChallenge,
}) =>
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
                onPress={goToChallenge}
                source={streak}
                number="1/1"
                style={{ marginVertical: 10 }}
                style={{ borderColor: mainColor, borderWidth: 1 }}
            />

            <LeftElement
                onPress={goToEditNumberOfWeekWorkouts}
                style={{ borderColor: mainColor, borderWidth: 1, marginTop: 5 }}
                source={numberOfTranings}
                number={`${numberOfTrainings} / ${weeklyTrainingGoal}`}
            />

        </View>
        <UserImages goToHighscore={goToHighscore} goBack={goBack} />
    </View>;
const ClickableElement = ({ image, onPress, style }) =>
    <TouchableOpacity
        onPress={onPress}
        style={{
            width: '50%',
            ...style,
        }}>
        <Image source={image} />
    </TouchableOpacity>;
const BottomBar = ({ onPostImage, onXPressed }) =>
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
    </View>;
class CameraContainer extends Component {
    state = {
        data: null,
        interactionFinished: false,
    };
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({
                interactionFinished: true,
            });
        });
    }
    onPictureTaken = data => {
        this.modifyState(data);
    };

    goToChallenge = () => {
        pushRoute(this.props.navigation.navigate, 'Challenge');
    };

    goToHighscore = () => {
        pushRoute(this.props.navigation.navigate, 'Highscore');
    };

    goToEditNumberOfWeekWorkouts = () => {
        pushRoute(this.props.navigation.navigate, 'NumberOfWorkouts', {
            onFinish: selectedTrainingNumber => {
                const { goBack } = this.props.navigation;
                this.props.mutate({
                    variables: { weeklyTraining: selectedTrainingNumber },
                });

                goBack(null);
            },
        });
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
        if (!this.state.interactionFinished) {
            return null;
        }

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
                      goToChallenge={this.goToChallenge}
                      currentScore={this.props.currentScore}
                      isUser={this.isUser}
                      numberOfTrainings={this.props.numberOfTrainings}
                      userStreak={this.props.streak}
                      weeklyTrainingGoal={this.props.weeklyTrainingGoal}
                      goToHighscore={this.goToHighscore}
                      goBack={this.props.navigation.goBack}
                      goToEditNumberOfWeekWorkouts={
                          this.goToEditNumberOfWeekWorkouts
                      }
                  />
              </Camera>;
    }
}
export default userGQL(CameraContainer);
