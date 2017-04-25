import React from 'react';
import scenes from './scenes';
import ImagePreviewContainer from '../imagePreview/imagePreviewContainer';
import Camera from '../camera/cameraContainer';
import LoginContainer from '../login/loginContainter';
import WinScreen from '../common/winBackground';
import FailScreen from '../common/errorBackground';
import Loading from '../common/loadingScreen';
import ApproviedImage from '../approvedImage/approvedImageContainer';
import Highscore from '../highscore/highscoreContainer';

const renderScene = (props, user) => {
    const { scene: { route } } = props;
    switch (route.key) {
        case scenes.onboarding.key:
            return <LoginContainer />;
        case scenes.winScreen.key:
            return <WinScreen />;
        case scenes.errorScreen.key:
            return <FailScreen />;
        case scenes.main.key:
            return <Camera />;
        case scenes.previewImage.key:
            return <ImagePreviewContainer />;
        case scenes.loading.key:
            return <Loading />;
        case scenes.approviedImage.key:
            return <ApproviedImage />;
        case scenes.highscore.key:
            return <Highscore />;
        default:
            return <Camera />;
    }
};

export default renderScene;
