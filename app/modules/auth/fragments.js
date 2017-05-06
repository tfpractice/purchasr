import gql from 'graphql-tag';

export const USER_INFO = gql`
  fragment userInfo on User{
    id
    username    
  }`;

export const USER_PURCHASE = gql`
  fragment userPurchase on UserPurchasesEdge{
      product:node{
        id
        name
        stock
      }
      quantity
  } 
`;

export const VIEWER_USER = gql`
  fragment viewerUser on Viewer{
    user {
      ...userInfo
      purchases{
        edges{
          ...userPurchase
        }
      }
      sales{
        edges{
          node{
          id
          modifiedAt
          createdAt
          status
          count
          product{
            name
          }
        }
        }
      }
    }    
  }
${USER_INFO}
${USER_PURCHASE}
`;
