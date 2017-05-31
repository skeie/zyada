import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    TouchableWithoutFeedback,
} from 'react-native';
import Camera from 'react-native-camera';
import * as Progress from 'react-native-progress';
import { takePhoto } from '../../images/images';
import Text from '../common/text';
import { mainColor } from '../../theme/colors';

const NO_OP = () => {};

const TakePhotoBtn = ({ takePicture, progress }) => (
    <TouchableOpacity onPress={takePicture} style={styles.capture}>
        <View>
            <Progress.Circle
                progress={progress}
                size={75}
                color={mainColor}
                thickness={1}>
                <Image
                    source={takePhoto}
                    style={{ position: 'absolute', left: 8, top: 7 }}
                />
            </Progress.Circle>
        </View>
    </TouchableOpacity>
);

export default class CameraDummy extends Component {
    static defaultProps = {
        setBlurReady: NO_OP,
    };
    state = {
        progress: 0,
        cameraType: Camera.constants.Type.back,
        viewRef: null,
    };

    isClicked = false;

    componentWillReceiveProps({ progress }) {
        if (progress !== this.props.progress) {
            this._setProgress(progress);
        }
    }

    _setProgress = progress => {
        setTimeout(() => {
            this.setState({ progress });
        }, 500);
    };
    componentDidMount() {
        this.props.setBlurReady(this.camera);
        this._setProgress(this.props.progress);
    }

    _handleFocusChanged() {}
    _handleZoomChanged() {}

    toggleCameraType = (currentType: String) =>
        currentType === Camera.constants.Type.back
            ? Camera.constants.Type.front
            : Camera.constants.Type.back;
    changeCameraType = () => {
        if (this.isClicked) {
            this.isClicked = false;
            this.setState(({ cameraType }) => ({
                cameraType: this.toggleCameraType(cameraType),
            }));
        } else {
            this.isClicked = true;
            setTimeout(() => {
                this.isClicked = false;
            }, 200);
        }
    };
    render() {
        return (
            <TouchableWithoutFeedback
                onPress={this.changeCameraType}
                style={styles.container}>
                <Camera
                    playSoundOnCapture={false}
                    ref={cam => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill}
                    flashMode={Camera.constants.FlashMode.off}
                    captureQuality={Camera.constants.CaptureQuality.medium}
                    defaultOnFocusComponent
                    type={this.state.cameraType}
                    onFocusChanged={this._handleFocusChanged}
                    onZoomChanged={this._handleZoomChanged}
                    captureTarget={Camera.constants.CaptureTarget.disk}
                    mirrorImage={false}>
                    {this.props.children}
                    <TakePhotoBtn
                        progress={this.state.progress}
                        takePicture={this.takePicture}
                    />
                </Camera>
            </TouchableWithoutFeedback>
        );
    }

    takePicture = () => {
        const options = {};
        //options.location = ...
        this.camera
            .capture({ metadata: options })
            .then(this.props.onPictureTaken)
            .catch(err => console.error(err));
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        borderRadius: 5,
        padding: 10,
        margin: 40,
    },
});
