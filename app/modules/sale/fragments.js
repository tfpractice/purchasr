import gql from 'graphql-tag';

// import { Auth, Product, } from '../';

// const { fragments: { USER_INFO, }, } = Auth;
// const { fragments: { PRODUCT_INFO, }, } = Product;

export const SALE_INFO = gql`
  fragment saleInfo on Sale{
    id
    count
    status
    modifiedAt
    createdAt
  }
`;
