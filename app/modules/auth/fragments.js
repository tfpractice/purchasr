import gql from 'graphql-tag';
import { SALE_INFO, } from '../sale/fragments';
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
          node {
          id
          count
          status
          modifiedAt
          createdAt
          user{
            id
          }
          product{
            id
            stock
          }
      }
      }
      }
    }    
  }
${USER_INFO}
${USER_PURCHASE}
`;
