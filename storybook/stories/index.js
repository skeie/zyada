import React from 'react';
import ErrorBackground from '../../src/components/common/errorBackground';
import Signup from '../../src/components/login/UserProfile';
import Win from '../../src/components/common/winBackground';
import Highscore from '../../src/components/highscore/highscore';
import { storiesOf, action, linkTo } from '@kadira/react-native-storybook';
import { List, fromJS } from 'immutable';
require('../../src/utils/onRun');

const highscore = List(
    fromJS([
        { name: 'Truls', highscore: 1337, id: 1 },
        { name: 'Truls', highscore: 1337, id: 2 },
        { name: 'Truls', highscore: 1337, id: 3 },
        { name: 'Truls', highscore: 1337, id: 4 },
    ]),

);
storiesOf('Error background', module).add('with text', () => (
    <ErrorBackground style={{ color: 'black' }}>Hello Button</ErrorBackground>
));
storiesOf('Win', module).add('Not clicked', () => <Win />);

storiesOf('Signup step 2', module).add('Not clicked', () => (
    <Signup
        name="Truls Skeie"
        url="https://scontent.xx.fbcdn.net/v/t1.0-1/c247.37.466.466/s50x50/481116_10150942288436755_577856798_n.jpg?oh=ded905be3cc592cef2b153a4c1036846&oe=5993E57D"
    />
));

storiesOf('Highscore', module).add('', () => (
    <Highscore highscores={highscore} />
));
