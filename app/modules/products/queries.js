import gql from 'graphql-tag';
import { PRODUCT_INFO, } from './fragments';

export const PRODUCT_BY_ID = gql`
  query GetProduct($id: ID!){
    product {
      ...productInfo
    }
  } 
${PRODUCT_INFO}`;

export const ALL_PRODUCTS = gql`
  query GetAllProducts($where:ProductWhereArgs $orderBy:[ProductOrderByArgs]) {
    viewer {
      allProducts(where:$where orderBy:$orderBy) {
        edges {
           product:node {
             ...productInfo
          }
        }
      }
    }
  }
${PRODUCT_INFO}`;

export const UNPURCHASED_PRODUCTS = gql`
  query GetUnPurchased {
    viewer {
      user{
        id
      }
      allProducts {
        edges {
          product:node {
            ...productInfo
          }
        }
      }
    }
  }
${PRODUCT_INFO}`;

export const CREATE_PRODUCT = gql`
   mutation CreateProductMutation($input: CreateProductInput!) {
     createProduct(input: $input) {
       product:changedProduct {
        ...productInfo
       }
     }
   }
   ${PRODUCT_INFO}`;

export const EDIT_PRODUCT = gql`
  mutation UpdateProductMutation($input: UpdateProductInput!) {
    updateProduct(input: $input) {
      changedProduct {
        ...productInfo
      }
    }
  }
${PRODUCT_INFO}`;

export const DESTROY_PRODUCT = gql`
  mutation DeleteProductMutation($input: DeleteProductInput!) {
    deleteProduct(input: $input) {
      changedProduct {
        ...productInfo
      }
    }
  }
${PRODUCT_INFO}`;

export const PURCHASE_PRODUCT = gql`
    mutation AddProduct($input: AddToPurchasesConnectionInput!) {
      addToPurchasesConnection(input: $input) {
        changedPurchases {
          user {
            id
            username
          }
          product {
            ...productInfo
          }
        }
      }
    }
${PRODUCT_INFO}`;

export const UNPURCHASE_PRODUCT = gql`
  mutation RemoveProduct($input: RemoveFromPurchasesConnectionInput!) {
    removeFromPurchasesConnection(input: $input) {
      changedPurchases {
        user {
          id
          username
        }
        product {
          ...productInfo
        }
    }
  }
}
${PRODUCT_INFO}`;
