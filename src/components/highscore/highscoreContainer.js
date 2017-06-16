/**
 * @flow
 */
import React, { Component } from 'react';
import { List, fromJS } from 'immutable';
import Highscore from './highscore';
import { fetchHighscore } from './highscoreActions';
import { connect } from 'react-redux';
import Loading from '../common/loadingScreen';
import { TouchableOpacity } from 'react-native';
import { goToRoute } from '../router/routerCommon';
import GQLContainer from './highscoreGQL';

class HighscoreContainer extends Component {
    // componentDidMount() {
    //     this.props.dispatch(fetchHighscore());
    // }

    goToMain = () => {
        goToRoute(this.props.navigation.dispatch, 'Home');
    };
    render() {
        const { loading, highscore } = this.props.data;
        if (loading) {
            return <Loading />;
        }

        const userPosition = parseInt(highscore.position, 10);

        return (
            <Highscore
                highscores={highscore.highscores}
                userPosition={userPosition}
            />
        );
    }
}

export default GQLContainer(HighscoreContainer);
