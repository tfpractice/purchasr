// import gql from 'graphql-tag';
//
// // import { fragments, } from '../auth';
//
// export const PURCHASE_PRODUCT = gql`
//     mutation AddProduct($input: AddToPurchasesConnectionInput!) {
//       addToPurchasesConnection(input: $input) {
//         changedPurchases {
//           ...purchaseInfo
//         }
//       }
//     }
// ${PURCHASE_INFO}`;
//
// export const UNPURCHASE_PRODUCT = gql`
//   mutation RemoveProduct($input: RemoveFromPurchasesConnectionInput!) {
//     removeFromPurchasesConnection(input: $input) {
//       changedPurchases {
//         ...purchaseInfo
//     }
//   }
// }
// ${PURCHASE_INFO}`;
