import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import CameraContainer from './cameraContainer';
const query = gql`query {
    user {
  id
  streak
  weeklyTraining
},unseenImage {
  numberOfImages
},
highscore {
  position
  highscore

}}
    `;

export default props => {
    const ViewWithData = graphql(query)(LoadingData);
    return <ViewWithData {...props} />;
};

const LoadingData = ({
    data: { loading, user, unseenImage, highscore },
    navigation,
}) => {
    return (
        !loading &&
        <CameraContainer
            streak={user.streak}
            numberOfTrainings={unseenImage.numberOfImages}
            id={user.id}
            weeklyTrainingGoal={user.weeklyTraining}
            progress={unseenImage.numberOfImages / user.weeklyTraining || 0}
            currentScore={highscore.position}
            unseenImage={unseenImage}
            highscore={highscore}
            navigation={navigation}
        />
    );
};
