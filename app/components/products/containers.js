import { compose, graphql, withApollo, } from 'react-apollo';
import { spread, } from 'fenugreek-collections';
import * as Query from './queries';
import { all, byID, create, destroy, edit, } from './queries';

// const dataToProps = ({ data, }) => ({
//   data,
//   edges: data.viewer.allProducts.edges.map(({ node, }) => node),
// });

const getEdges = ({ data: { viewer: { allProducts: { edges, }, }, }, },
) => spread(edges);

const isEmpty = (edges = []) => edges.length === 0;

const createProduct = ({ mutate, }) => input =>
 mutate({ variables: { input, }, });

export const AllProducts = component => graphql(all, {
  name: 'products',
  props: ({ products, }) => {
    console.log('products', products);
    return ({ data: products, products: (getEdges({ data: products, })).map(({ product: node, }) => node), });
  },
})(component);

export const WithCreate = component => graphql(create, {
  options: ops => ({ refetchQueries: [ 'GetAllProducts', ], }),
  props: ({ mutate, }) => ({ createProduct: createProduct({ mutate, }), }),
})(component);

export const ProductView = component => compose(AllProducts, WithCreate)(component);

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
  compose(WithAllProducts, WithCreateProduct,)(component);

export default CRUDProduct;
