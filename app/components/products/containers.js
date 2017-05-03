import { compose, graphql, } from 'react-apollo';
import { Product, Purchases, } from 'modules';
import { viewNodes, } from 'utils';
import { WithCurrent, } from '../auth/containers';
import { WithPurchase, } from '../purchase';
export { WithPurchase, };

const getID = ({ id, }) => id;
const { actions: { dropProduct, purchaseProduct, }, } = Purchases;
const { queries: { UNPURCHASE_PRODUCT, PURCHASE_PRODUCT, }, } = Purchases;

const {
  actions:  { createProduct, destroyProduct, editProduct, sortProducts, },
  queries:  { ALL_PRODUCTS, CREATE_PRODUCT, DESTROY_PRODUCT, EDIT_PRODUCT, PRODUCT_BY_ID, },
} = Product;

export const WithAll = component => graphql(ALL_PRODUCTS, {
  options: { variables: { where: { stock: { gt: 0, }, }, }, },
  props: ({ data, }) => ({
    WithAll: data,
    products: viewNodes(data),
    byPrice: () => sortProducts(data)('price'),
    byStock: () => sortProducts(data)('stock'),
  }),
})(component);

export const WithCreate = component => graphql(CREATE_PRODUCT, {
   props: ({ mutate, }) =>
   ({ createProduct: createProduct(mutate), }),
   options: { refetchQueries: [ 'GetAllProducts', ], },
})(component);

export const WithProduct = component => graphql(PRODUCT_BY_ID, {
  skip:  ({ id, } = { id: '', }) => !id,
  options: ({ ownProps: { id, }, }) => ({ variables: { id, }, }),
  props: ({ data, }) => ({ getProduct: data, }),
})(component);

export const WithUpdate = component => graphql(EDIT_PRODUCT, {
  skip: ({ id, }) => false,
  props: ({ mutate, ownProps: { id, }, }) =>
    ({ updateProduct: editProduct(mutate)(id), }),
  options: { refetchQueries: [ 'GetAllProducts', ], },
})(component);

export const WithDestroy = component => graphql(DESTROY_PRODUCT, {
  skip: ({ id, }) => !id,
  props: ({ mutate, ownProps: { id, }, }) =>
   ({ destroyProduct: destroyProduct(mutate)(id), }),
  options: { refetchQueries: [ 'GetAllProducts', ], },
})(component);

export const isInCart = cart => product =>
  new Set(cart.map(getID)).has(getID(product));

export const WithUnPurchase = component => WithPurchase(graphql(UNPURCHASE_PRODUCT, {
  options: { refetchQueries: [ 'GetCurrentUser', ], },
  skip: ({ currentUser, purchases, product, }) => !currentUser || !isInCart(purchases)(product),
  props: ({ mutate, ownProps: { product, currentUser: { id: uid, }, }, }) =>
   ({ dropProduct: () => dropProduct(mutate)(uid)(product.id), }),
})(component));

export const WithEdit = component => compose(WithUpdate, WithDestroy)(component);
