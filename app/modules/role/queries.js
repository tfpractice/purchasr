import gql from 'graphql-tag';

export const GET_ROLES = gql`
  query GetRoles($where:RoleWhereArgs, $first:Int) {
   viewer {
     collection:allRoles(where:$where, first:$first) {
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
             username
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
          username
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
        username
        }   
      }
    }
   }
`;
