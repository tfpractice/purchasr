import gql from 'graphql-tag';
import { USER_INFO, USER_PURCHASE, VIEWER_USER, } from './fragments';

export const CURRENT_USER = gql`
  query GetCurrentUser {
    viewer {
      ...viewerUser
  }
} 
 ${VIEWER_USER}
 ${USER_INFO}
 ${USER_PURCHASE}
`;

export const GET_USERS = gql`
  query GetUsers($where:UserWhereArgs $first:Int) {
   viewer {
     allUsers(where:$where first:$first) {
       edges {
         node {
           ...userInfo
         }
       }
     }
   }
 }
  ${USER_INFO}`;

export const CREATE_USER = gql`
  mutation CreateUserMutation($input: CreateUserInput!) {
     createUser(input: $input) {
       token
       user:changedUser {
         ...userInfo
       }
     }
   }
    ${USER_INFO}`;

export const LOGIN_USER = gql`
  mutation LoginUserMutation($input: LoginUserInput!) {
    loginUser(input: $input) {
      token
      user {
        ...userInfo
      }
    }
  }
${USER_INFO}`;
