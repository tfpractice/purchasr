import gql from 'graphql-tag';
import { SALE_INFO, } from './fragments';

export const ALL_SALES = gql`
  query GetAllSales($where:SaleWhereArgs $orderBy:[SaleOrderByArgs]) {
    viewer {
      collection:allSales(where:$where orderBy:$orderBy) {
        edges {
           node {
            ...saleInfo
          }
        }
      }
    }
  }
${SALE_INFO}`;

export const SALE_BY_ID = gql`
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
      changedSale {
        ...saleInfo
      }
    }
  }
${SALE_INFO}`;

export const DESTROY_SALE = gql`
  mutation DeleteSaleMutation($input: DeleteSaleInput!) {
    deleteSale(input: $input) {
      changedSale {
        ...saleInfo
      }
    }
  }
${SALE_INFO}`;
