import gql from 'graphql-tag';

// import { Product, } from '../';
import { PRODUCT_INFO, } from '../products/fragments';
import { SALE_INFO, } from './fragments';

// const { fragments: { PRODUCT_INFO, }, } = Product;

export const ALL_SALES = gql`
  query GetAllSales($where:SaleWhereArgs $orderBy:[SaleOrderByArgs]) {
    viewer {
      collection:allSales(where:$where orderBy:$orderBy) {
        edges {
           node {
            ...saleInfo
            user{
              id
              username
            }
            product{
              id
              name
              price
              stock
            }
          }
        }
      }
    }
  }
${SALE_INFO}`;

export const GET_SALE = gql`
  query GetSale($id: ID!){
    getSale(id:$id) {
      ...saleInfo
    }
  } 
${SALE_INFO}`;

export const CREATE_SALE = gql`
   mutation CreateSaleMutation($input: CreateSaleInput!) {
     createSale(input: $input) {
       sale:changedSale {
        ...saleInfo
       }
     }
   }
   ${SALE_INFO}`;

export const EDIT_SALE = gql`
  mutation UpdateSaleMutation($input: UpdateSaleInput!) {
    updateSale(input: $input) {
      sale:changedSale {
        ...saleInfo
      }
    }
  }
${SALE_INFO}`;

export const DESTROY_SALE = gql`
  mutation DeleteSaleMutation($input: DeleteSaleInput!) {
    deleteSale(input: $input) {
      sale:changedSale {
        ...saleInfo
      }
    }
  }
${SALE_INFO}`;

export const SELL_AND_UPDATE = gql`
   mutation SellAndUpdate($input: CreateSaleInput!, $pInput: UpdateProductInput!) {
     createSale(input: $input) {
       sale:changedSale {
        ...saleInfo
      }
    }
    updateProduct(input: $pInput) {
      product:changedProduct {
        ...productInfo
      }
    }
  }
  ${SALE_INFO}
  ${PRODUCT_INFO} `
   ;
   
export const EDIT_SALE_AND_UPDATE = gql`
      mutation EditSaleAndUpdate($input: UpdateSaleInput!, $pInput: UpdateProductInput!) {
        updateSale(input: $input) {
          sale:changedSale {
           ...saleInfo
         }
       }
       updateProduct(input: $pInput) {
         product:changedProduct {
           ...productInfo
         }
       }
     }
     ${SALE_INFO}
     ${PRODUCT_INFO} `
      ;
export const UNSELL_AND_UPDATE = gql`
  mutation UnsellAndUpdate($input: DeleteSaleInput!, $pInput: UpdateProductInput!) {
    deleteSale(input: $input) {
      changedSale {
        ...saleInfo
      }
    }
    updateProduct(input: $pInput) {
      product:changedProduct {
        ...productInfo
      }
    }
  }
  ${SALE_INFO}
  ${PRODUCT_INFO}`;
