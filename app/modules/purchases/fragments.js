import gql from 'graphql-tag';

// import { Auth, Product, } from './';
import { USER_INFO, } from '../auth/fragments';
import { PRODUCT_INFO, } from '../products/fragments';

// const { fragments: { USER_INFO, }, } = Auth;
// const { fragments: { PRODUCT_INFO, }, } = Product;

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
