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
import { NavigationActions } from 'react-navigation';
class HighscoreContainer extends Component {
    goToMain = () => {
        goToRoute(this.props.navigation.dispatch, 'Home');
    };
    goBack = () => {
        this.props.navigation.dispatch(NavigationActions.back);
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
                goBack={this.goBack}
            />
        );
    }
}

export default GQLContainer(HighscoreContainer);
