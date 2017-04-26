import { compose, graphql, withApollo, } from 'react-apollo';
import * as Query from './queries';
import { all, byID, create, destroy, edit, } from './queries';

const createProduct = ({ mutate, }) => input => mutate({ variables: { input, }, });
const getEdges = ({ data: { viewer: { allProducts: { edges, }, }, }, },
) => spread(edges);

export const AllProducts = component => graphql(all, {
name: 'products',
props: ({ products, ownProps, }) => {
  console.log('allProps', ownProps);
  console.log('products', products);
  return ({ products: products.viewer.allProducts.edges.map(({ node, }) => node), });
},
})(component);

export const CreateProduct = component => graphql(create, {
  name: 'createProduct',
  props: ({ createProduct, ownProps, }) => {
    console.log('ownProps', ownProps);
    return ({ createProduct: input => createProduct({ variables: { input, }, }), });
  },
})(component);

export const WithProduct = component => graphql(byID, {
  name: 'getProduct',
  skip:  ({ id, } = { id: '', }) => !id,
  options: ({ getProduct, ownProps: { id, }, }) => ({ variables: id, }),
  props: ({ getProduct, ownProps, }) => ({ ownProps, getProduct, }),
})(component);

export const WithUpdateProduct = component => graphql(edit, {
name: 'updateProduct',
skip:  ({ id, } = { id: '', }) => !id,
props: ({ updateProduct, ownProps: { id, }, }) =>
 ({ updateProduct: input => updateProduct({ variables: { input: { id, ...input, }, }, }), }),
})(component);

export const WithDeleteProduct = component => graphql(destroy, {
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
