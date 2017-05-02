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

export const PURCHASE_INFO = gql`
  fragment purchaseInfo on Purchases{
    product{
    ...productInfo
    }
    user{
      id
      username
    }
    quantity
}
${PRODUCT_INFO}`;
