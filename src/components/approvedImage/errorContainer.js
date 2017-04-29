import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Error from '../common/errorBackground';
import { goToRoute } from '../router/routerCommon';

class ErrorContainer extends Component {
    goToMain = () => {
        goToRoute(this.props.navigation.dispatch, 'Home');
    };
    render() {
        return <Error name={this.props.name} />;
    }
}

export default connect(({ unSeenImage }) => ({
    name: unSeenImage.getIn(['hasSomeoneSeenImage', 'name']),
}))(ErrorContainer);
