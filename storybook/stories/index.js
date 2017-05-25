import React from 'react';
import Login from '../../src/components/login/login';
import ErrorBackground from '../../src/components/common/errorBackground';
import Signup from '../../src/components/login/UserProfile';
import ChooseGuild from '../../src/components/login/chooseGuild';
import Win from '../../src/components/common/winBackground';
import Highscore from '../../src/components/highscore/highscore';
import { storiesOf, action, linkTo } from '@kadira/react-native-storybook';
import Loading from '../../src/components/common/loadingScreen';
import ImagePreviewContainer
    from '../../src/components/imagePreview/imagePreviewContainer';

import NumberOfWorkouts from '../../src/components/login/numberOfWorkouts';
import Main from '../../src/components/camera/cameraContainer';
import { highscore, guilds } from './data';
import AskForPush from '../../src/components/login/askForPush';
require('../../src/utils/onRun');

storiesOf('Win', module).add('', () => <Win score={1337} />);

storiesOf('Signup step 2', module).add('', () => (
    <Signup
        name="Truls Skeie"
        url="https://scontent.xx.fbcdn.net/v/t1.0-1/c247.37.466.466/s200x200/481116_10150942288436755_577856798_n.jpg?oh=78e108e835b5d06d70b89c1b0b54dd96&oe=598F7018"
    />
));

storiesOf('Highscore', module).add('', () => (
    <Highscore highscores={highscore} />
));

storiesOf('Error', module).add('', () => <ErrorBackground name="Truls" />);

storiesOf('Loading screen', module).add('', () => <Loading />);
storiesOf('Login screen', module).add('', () => <Login />);

storiesOf('Number of workouts', module).add('', () => <NumberOfWorkouts />);
storiesOf('Choose guild', module).add('', () => (
    <ChooseGuild guilds={guilds} setGuild={() => {}} />
));

storiesOf('Ask For Push', module).add('', () => <AskForPush />);
