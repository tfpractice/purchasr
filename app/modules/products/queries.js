import gql from 'graphql-tag';

export const byID = gql`
  query GetProduct($id: ID!){
    product {
      id
      name
      price
    }
  }`;

export const all = gql`
  query GetAllProducts {
    viewer {
      allProducts {
        edges {
           product:node {
            id
            name
            price
          }
        }
      }
    }
  }`;

export const create = gql`
   mutation CreateProductMutation($input: CreateProductInput!) {
     createProduct(input: $input) {
       product:changedProduct {
         id
         name
         price
       }
     }
   }`;

export const edit = gql`
  mutation UpdateProductMutation($input: UpdateProductInput!) {
    updateProduct(input: $input) {
      changedProduct {
        name
        price
      }
    }
  }`;

export const destroy = gql`
  mutation DeleteProductMutation($input: DeleteProductInput!) {
    deleteProduct(input: $input) {
      changedProduct {
        name
        price
      }
    }
  }`;
  
export const PURCHASE_PRODUCT = gql`
    mutation AddProduct($input: AddToPurchasesConnectionInput!) {
      addToPurchasesConnection(input: $input) {
        changedPurchases {
          user {
            id
            username
          }
          product {
            id
            name
          }
        }
      }
    }`;

export const ALL_PRODUCTS = all;
export const PRODUCT_BY_ID = byID;
export const CREATE_PRODUCT = create;
export const EDIT_PRODUCT = edit;
export const DESTROY_PRODUCT = destroy;
