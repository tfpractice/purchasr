import gql from 'graphql-tag';
import { compose, graphql, withApollo, } from 'react-apollo';

const dataToProps = ({ data, }) => ({
  data,
  edges: data.viewer.allProducts.edges.map(({ node, }) => node),
});

const GetProduct = gql`
  query GetProduct($id: ID!){
    product {
      id
      name
      price
    }
  }`;

export const WithProduct = component => graphql(GetProduct, {
  name: 'getProduct',
  skip:  ({ id, } = { id: '', }) => !!id,
  options: ({ getProduct, ownProps: { id, }, }) => ({ variables: id, }),
  props: ({ getProduct, ownProps, }) => ({ ownProps, getProduct, }),
})(component);

const AllProducts = gql`
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

export const WithAllProducts = component => graphql(AllProducts, {
  name: 'products',
  props: ({ products, }) =>
  ({ products: products.viewer.allProducts.edges.map(({ node, }) => node), }),
})(component);

export const CreateProduct = gql`
   mutation CreateProductMutation($input: CreateProductInput!) {
     createProduct(input: $input) {
       changedProduct {
         name
         price
       }
     }
   }`;

export const WithCreateProduct = component => graphql(CreateProduct, {
  name: 'createProduct',
  props: ({ createProduct, }) =>
  ({ createProduct: input => createProduct({ variables: { input, }, }), }),
})(component);

export const UpdateProduct = gql`
  mutation UpdateProductMutation($input: UpdateProductInput!) {
    updateProduct(input: $input) {
      changedProduct {
        name
        price
      }
    }
  }`;

export const WithUpdateProduct = component => graphql(UpdateProduct, {
  name: 'updateProduct',
  skip:  ({ id, } = { id: '', }) => !id,
  props: ({ updateProduct, ownProps: { id, }, }) =>
   ({ updateProduct: input => updateProduct({ variables: { input: { id, ...input, }, }, }), }),
})(component);

export const DeleteProduct = gql`
  mutation DeleteProductMutation($id: ID!) {
    deleteProduct(id: $id) {
      changedProduct {
        name
        price
      }
    }
  }`;

export const WithDeleteProduct = component => graphql(DeleteProduct, {
    name: 'deleteProduct',
    skip:  ({ id, } = { id: '', }) => !id,
    props: ({ deleteProduct, ownProps: { id = '', }, }) =>
    ({ deleteProduct: () => deleteProduct({ variables: id, }), }),
})(component);

const CRUDProduct = component =>
   compose(WithProduct, WithUpdateProduct, WithDeleteProduct)(component);

export const ViewProducts = component =>
    compose(WithCreateProduct, WithAllProducts)(component);

export default CRUDProduct;
