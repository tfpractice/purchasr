import gql from 'graphql-tag';

const allProducts = gql`
query GetAllProducts {
  viewer {
    allProducts {
      edges {
        node {
          id
          name
          price
        }
      }
    }
  }
}`;

// const creat

export default allProducts;
