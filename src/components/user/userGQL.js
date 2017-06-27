// import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const updateUserPost = gql`
mutation updateUser ($weeklyTraining: Int!) {
     updateWeeklyTraning(weeklyTraining: $weeklyTraining)    
}`;

export default Component => graphql(updateUserPost)(Component);
