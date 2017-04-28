import gql from 'graphql-tag';

export const CURRENT_USER = gql`
  query Viewer {
    viewer {
      user {
        id
        username
      }
  }
}`;

export const GET_USERS = gql`
  query GetUsers($where:UserWhereArgs $first:Int) {
   viewer {
     allUsers(where:$where first:$first) {
       edges {
         node {
           id
           username
         }
       }
     }
   }
 }`;

export const CREATE_USER = gql`
  mutation CreateUserMutation($input: CreateUserInput!) {
     createUser(input: $input) {
       token
       user:changedUser {
         id
         username
       }
     }
   }`;

export const LOGIN_USER = gql`
     mutation LoginUserMutation($input: LoginUserInput!) {
       loginUser(input: $input) {
         token
         user {
           id
           username
         }
       }
     }`;
