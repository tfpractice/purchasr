import gql from 'graphql-tag';
import { USER_INFO, VIEWER_USER, } from './fragments';

export const CURRENT_USER = gql`
  query GetCurrentUser($sWhere: SaleWhereArgs) {
    viewer {
      ...viewerUser
  }
} 
${VIEWER_USER}`;

export const GET_USERS = gql`
  query GetUsers($where:UserWhereArgs, $first:Int) {
   viewer {
     collection:allUsers(where:$where first:$first) {
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

export const GET_ROLES = gql`
  query GetRoles($where:RoleWhereArgs $first:Int) {
   viewer {
     collection:allRoles(where:$where first:$first) {
       edges {
        node {
           name
           id
         }
       }
     }
   }
 }`;

export const ADD_ROLE = gql`
     mutation AddRoleMutation($input: AddToUserRolesConnectionInput!) {
       addToUserRolesConnection(input: $input) {
         changedUserRoles {
           role{
             id
             name
           }
           user{
             id
             name
           }
         }
       }
     }
 `;

export const UPDATE_ROLE = gql`
  mutation UpdateRole($input: UpdateUserRolesConnectionInput!) {
    updateUserRolesConnection(input: $input) {
      changedUserRoles {
        role{
          id
          name
        }
        user{
          id
          name
        }   
      }
    }
  }
`;

export const DROP_ROLE = gql`
  mutation DropRole($input: RemoveFromUserRolesConnectionInput!) {
   removeFromUserRolesConnection(input: $input) {
     changedUserRoles {
       role{
       id
       name
     }
     user{
       id
       name
      }   
      }
      }
   }
`;
