import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

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
    return HighscoreQueryWithData;
};
