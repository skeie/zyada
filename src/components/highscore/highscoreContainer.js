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

class HighscoreContainer extends Component {
    componentDidMount() {
        this.props.dispatch(fetchHighscore());
    }

    goToMain = () => {
        goToRoute(this.props.navigation.dispatch, 'Home');
    };
    render() {
        if (this.props.highscore.get('isLoading')) {
            return <Loading />;
        }
        const userPosition = parseInt(
            this.props.highscore.getIn(['userHighScore', 'position']),
            10,
        );
        return (
            <TouchableOpacity
                style={{ flex: 1 }}
                onPress={this.goToMain}
                activeOpacity={0.8}>
                <Highscore
                    highscores={this.props.highscore.get('highscore')}
                    userPosition={userPosition}
                />
            </TouchableOpacity>
        );
    }
}

export default connect(({ highscore }) => ({ highscore }))(HighscoreContainer);
