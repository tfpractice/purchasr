import gql from 'graphql-tag';
import { PURCHASE_INFO, } from './fragments';

export const PURCHASE_PRODUCT = gql`
    mutation AddProduct($input: AddToPurchasesConnectionInput!, $pInput:UpdateProductInput!) {
      addToPurchasesConnection(input: $input) {
        changedPurchases {
          ...purchaseInfo
        }
      }
    
    }
${PURCHASE_INFO}`;

// updateProduct(input: $pInput) {
//   changedProduct {
//     ...productInfo
//   }
// }

export const BUY_AND_UPDATE = gql`
    mutation BuyAndUpdate($input: AddToPurchasesConnectionInput!, $pInput:UpdateProductInput!) {
      addToPurchasesConnection(input: $input) {
        changedPurchases {
          ...purchaseInfo
        }
      }
      updateProduct(input: $pInput) {
        changedProduct {
          id
          name
          stock
          price
          description
        }
      }    
    }
${PURCHASE_INFO}`;

//
// export const CANCEL_SALE = gql`
//     mutation CancelSale($input: RemoveFromPurchasesConnectionInput!, $pInput:UpdateProductInput!) {
//       RemoveFromPurchasesConnection(input: $input) {
//         changedPurchases {
//           ...purchaseInfo
//         }
//       }
//       updateProduct(input: $pInput) {
//         changedProduct {
//           id
//           name
//           stock
//           price
//           description
//         }
//       }
//     }
// ${PURCHASE_INFO}`;

//
//  const EDIT_PRODUCT = gql`
//   mutation UpdateProductMutation($input: UpdateProductInput!) {
//     updateProduct(input: $input) {
//       changedProduct {
//         ...productInfo
//       }
//     }
//   }
// ${PRODUCT_INFO}`;

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
