import gql from 'graphql-tag';

export const SALE_INFO = gql`
  fragment saleInfo on Sale{
    id
    count
    status
    modifiedAt
    createdAt
    user{
      id
    }
    product{
      id
      stock
    }
  }
`;
