import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUnSeenImages } from '../unSeenImage/unSeenActions';
import { fetchHighscore } from '../highscore/highscoreActions';
import Loading from './loadingScreen';
import { goToRoute } from '../router/routerCommon';
class FetchAllData extends Component {
    componentDidMount() {
        this._fetchData();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    isLoaded = () => this.setState({ isLoaded: true });
    _fetchData = async () => {
        if (this.props.jwtToken) {
            const fetchAllData = await Promise.all([
                this.props.dispatch(fetchUnSeenImages()),
                this.props.dispatch(fetchHighscore()),
            ]);
            goToRoute(this.props.navigation.dispatch, 'Home');
        } else {
            goToRoute(this.props.navigation.dispatch, 'Home');
        }
    };

    render() {
        return <Loading />;
    }
}

export default connect(({ user, unSeenImage }) => ({
    jwtToken: user.get('jwtToken'),
    unSeenImages: unSeenImage.get('images'),
}))(FetchAllData);
