import gql from 'graphql-tag';
import { PURCHASE_INFO, } from './fragments';

export const PURCHASE_PRODUCT = gql`
    mutation AddProduct($input: AddToPurchasesConnectionInput!) {
      addToPurchasesConnection(input: $input) {
        changedPurchases {
          ...purchaseInfo
        }
      }
    }
${PURCHASE_INFO}`;

export const UPDATE_PUCHASE = gql`
    mutation UpdatePurchase($input: UpdatePurchasesConnectionInput!) {
      updatePurchasesConnection(input: $input) {
        changedPurchases {
          ...purchaseInfo
        }
      }
    }
${PURCHASE_INFO}`;

export const UNPURCHASE_PRODUCT = gql`
  mutation RemoveProduct($input: RemoveFromPurchasesConnectionInput!) {
    removeFromPurchasesConnection(input: $input) {
      changedPurchases {
        ...purchaseInfo
    }
  }
}
${PURCHASE_INFO}`;

//
// export const USER_PURCHASE=
// // export const PURCHASED_PRODUCTS = gql`
//   query GetAllProducts($where:ProductWhereArgs $orderBy:[ProductOrderByArgs]) {
//     viewer {
//       allProducts(where:$where orderBy:$orderBy) {
//         edges {
//            product:node {
//              ...productInfo
//           }
//         }
//       }
//     }
//   }
// ${PRODUCT_INFO}`;
