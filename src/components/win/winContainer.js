import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Win from '../common/winBackground';
class WinContainer extends Component {
    render() {
        return <Win score={this.props.score} />;
    }
}

export default connect(({ unSeenImage }) => ({
    score: unSeenImage.get('score'),
}))(WinContainer);
