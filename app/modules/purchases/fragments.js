import gql from 'graphql-tag';

import { PRODUCT_INFO, } from '../products';
import { USER_INFO, } from '../auth';

export const USER_PURCHASE = gql`
  fragment userPurchase on UserPurchasesEdge{
      product:node{
        id
        name
      }
      quantity
  }
`;

export const PURCHASE_INFO = gql`
  fragment purchaseInfo on Purchases{
    product{
    ...productInfo
    }
    user{
    ...userInfo
    }
    quantity
}
${USER_INFO}
${PRODUCT_INFO}`;
