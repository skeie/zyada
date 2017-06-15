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

const LoadingGraphQLData = ({ data: { users, loading } }) => {
    console.log(users, loading, 'sap');
    return !loading && <UserImages images={users} />;
};

// const President = ({ data }) => {
//     debugger;
//     return (
//         <View style={{ paddingLeft: 20, paddingTop: 20 }}>
//             <Text>Name: {data.president && data.president.name}</Text>
//             <Text>Party: {data.president && data.president.party}</Text>
//             <Text>Term: {data.president && data.president.term}</Text>
//         </View>
//     );
// };

// ({data: { loading }}, Component)
