import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const updateUserPost = gql`
mutation updateUser ($weeklyTraining: Int!) {
     updateWeeklyTraning(weeklyTraining: $weeklyTraining)    
}`;

const highscoreQuery = gql`
query {
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
}
`;

export default Container => {
    const HighscoreQueryWithData = graphql(highscoreQuery)(Container);
    return graphql(updateUserPost)(HighscoreQueryWithData);
    return HighscoreQueryWithData;
};
