import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Text from '../common/text';
import UserImages from '../common/userImages';

export default props => {
    const query = gql`query { 
       
  highscore {
  position
  highscore
  highscores {
    userid
    name
    image
    highscore
  }
}

    }`;

    const ViewWithData = graphql(query)(LoadingGraphQLData);
    return <ViewWithData {...props} />;
};

const LoadingGraphQLData = ({
    data: { highscore, loading },
    goToHighscore,
    goBack,
}) => {
    return (
        !loading &&
        <UserImages
            images={highscore.highscores.map(({ image, userid }) => ({
                image,
                id: userid,
            }))}
            goBack={goBack}
            goToHighscore={goToHighscore}
        />
    );
};
