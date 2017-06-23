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
  highscores {
    userid
    name
    image
    highscore
  }
}}
    `;

export default props => {
    console.log('kommer du hit?');
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
            progress={unseenImage.numberOfImages / user.weeklyTraining}
            currentScore={highscore.position}
            userImages={highscore.highscores.map(({ image, userid }) => ({
                image,
                id: userid,
            }))}
            unseenImage={unseenImage}
            highscore={highscore}
            navigation={navigation}
        />
    );
};

{
    /*-    streak: user.get('streak', 0),
-    numberOfTrainings: unSeenImage.get('numberOfImages'),
-    id: user.get('id'),
-    weeklyTrainingGoal: user.get('weeklyTraining'),
-    progress: unSeenImage.get('numberOfImages') / user.get('weeklyTraining'),
-    currentScore: highscore.getIn(['userHighScore', 'highscore']),
-    userImages: highscore.get('highscore', new Map()).map(highscore => ({
-        image: highscore.get('image'),
-        id: highscore.get('userid'),*/
}
