import gql from 'graphql-tag';

export const SALE_INFO = gql`
  fragment saleInfo on Sale{
    id
    modifiedAt
    user{
      username
    }
    product{
      id
      name
      stock
    }
    createdAt
    status
    count
  }
`;
