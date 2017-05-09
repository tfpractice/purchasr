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
