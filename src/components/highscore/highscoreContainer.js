
/**
 * @flow
 */
import React, { Component } from 'react';
import { List, fromJS } from 'immutable';
import Highscore from './highscore';
const highscores = List(
    fromJS([
        { name: 'Truls', highscore: 1337, id: 1 },
        { name: 'Truls', highscore: 1337, id: 2 },
        { name: 'Truls', highscore: 1337, id: 3 },
        { name: 'Truls', highscore: 1337, id: 4 },
    ]),

);
class HighscoreContainer extends Component {
    render() {
        return <Highscore highscores={highscores}/>
    }
}

export default HighscoreContainer;