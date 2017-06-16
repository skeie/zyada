import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Text from '../common/text';
import UserImages from '../common/userImages';

export default props => {
    const query = gql`query { 
                users {
                    image
            }
    }`;

    const ViewWithData = graphql(query)(LoadingGraphQLData);
    return <ViewWithData {...props} />;
};

const LoadingGraphQLData = ({ data: { users, loading }, goToHighscore }) => {
    return (
        !loading && <UserImages images={users} goToHighscore={goToHighscore} />
    );
};
