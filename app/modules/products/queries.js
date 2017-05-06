import gql from 'graphql-tag';
import { VIEWER_USER, } from '../auth';
import { PRODUCT_INFO, } from './fragments';

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!){
    getProduct(id:$id) {
      ...productInfo
    }
  } 
${PRODUCT_INFO}`;

export const ALL_PRODUCTS = gql`
  query GetAllProducts($where:ProductWhereArgs $orderBy:[ProductOrderByArgs]) {
    viewer {
      collection:allProducts(where:$where orderBy:$orderBy) {
        edges {
           node {
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
    ...viewerUser
      collection:allProducts {
        edges {
          node {
            ...productInfo
          }
        }
      }
    }
  }
${PRODUCT_INFO}
${VIEWER_USER}`;

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
