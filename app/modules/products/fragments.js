import gql from 'graphql-tag';

export const PRODUCT_INFO = gql`
  fragment productInfo on Product{
    id
    name
    price
    stock
    description
  }
`;
