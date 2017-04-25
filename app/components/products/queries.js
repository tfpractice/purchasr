import gql from 'graphql-tag';
import { compose, graphql, withApollo, } from 'react-apollo';

const getEdges = ({ data: { viewer: { allUsers: { edges, }, }, }, },
) => spread(edges);

const isEmpty = (edges = []) => edges.length === 0;

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

export const CreateProduct = gql`
   mutation CreateProductMutation($input: CreateProductInput!) {
     createProduct(input: $input) {
       changedProduct {
         name
         price
       }
     }
   }`;
   
export const SubscribeToProducts = gql`
subscription SubscribeToProducts($filter: ProductSubscriptionFilter, $mutations: [ProductMutationEvent]!) {
  subscribeToProduct(mutations:$mutations, filter:$filter) {
    edge
    mutation
    value {
      id
      name
      price
      createdAt
    }
  }
}
`;

//
// export const WithSubsription = component => graphql(SubscribeToProducts, {
//   name: 'products',
//   props: ({ products, }) =>
//   ({ products: products.viewer.allProducts.edges.map(({ node, }) => node), }),
// })(component);

export const UpdateProduct = gql`
  mutation UpdateProductMutation($input: UpdateProductInput!) {
    updateProduct(input: $input) {
      changedProduct {
        name
        price
      }
    }
  }`;

export const DeleteProduct = gql`
  mutation DeleteProductMutation($id: ID!) {
    deleteProduct(id: $id) {
      changedProduct {
        name
        price
      }
    }
  }`;

export const WithAllProducts = component => graphql(AllProducts, {
  name: 'products',
  props: ({ products, ownProps: allProps, }) => {
    console.log('allProps', allProps);
    return ({ products: products.viewer.allProducts.edges.map(({ node, }) => node), });
  },
})(component);

export const WithCreateProduct = component => graphql(CreateProduct, {
    name: 'createProduct',
    props: ({ createProduct, ownProps, }) => {
      console.log('ownProps', ownProps);
      return ({ createProduct: input => createProduct({ variables: { input, }, }), });
    },
})(component);

export const WithProduct = component => graphql(GetProduct, {
    name: 'getProduct',
    skip:  ({ id, } = { id: '', }) => !id,
    options: ({ getProduct, ownProps: { id, }, }) => ({ variables: id, }),
    props: ({ getProduct, ownProps, }) => ({ ownProps, getProduct, }),
})(component);

export const WithUpdateProduct = component => graphql(UpdateProduct, {
  name: 'updateProduct',
  skip:  ({ id, } = { id: '', }) => !id,
  props: ({ updateProduct, ownProps: { id, }, }) =>
   ({ updateProduct: input => updateProduct({ variables: { input: { id, ...input, }, }, }), }),
})(component);

export const WithDeleteProduct = component => graphql(DeleteProduct, {
    name: 'deleteProduct',
    skip:  ({ id, } = { id: '', }) => !id,
    props: ({ deleteProduct, ownProps: { id = '', }, }) =>
    ({ deleteProduct: () => deleteProduct({ variables: id, }), }),
})(component);

const CRUDProduct = component =>
   compose(WithProduct, WithUpdateProduct, WithDeleteProduct)(component);

export const ViewProducts = component =>
    compose(WithAllProducts, WithCreateProduct, )(component);

export default CRUDProduct;
