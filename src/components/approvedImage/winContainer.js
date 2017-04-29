import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Win from '../common/winBackground';
import { goToRoute } from '../router/routerCommon';
import { fetchHighscore } from '../highscore/highscoreActions';

class WinContainer extends Component {
    componentDidMount() {
        this.props.dispatch(fetchHighscore());
    }

    goToMain = () => {
        goToRoute(this.props.navigation.dispatch, 'Home');
    };
    render() {
        return <Win score={this.props.score} />;
    }
}

export default connect(({ unSeenImage }) => ({
    score: unSeenImage.get('score'),
}))(WinContainer);
