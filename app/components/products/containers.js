import { compose, graphql, } from 'react-apollo';
import { Product, } from 'modules';
import { WithCurrent, } from '../auth/containers';

const replaceProduct = next => edges => edges.map(p => p.id === next.id ? next : { ...p, });
const addProduct = next => edges => edges.concat(next);
const getID = ({ id, }) => id;
const getProduct = ({ product, }) => product;

const {
  actions:  {
   createProduct, destroyProduct, dropProduct, editProduct,
   purchaseProduct, getProducts,
},
  queries:  {
 ALL_PRODUCTS, CREATE_PRODUCT, UNPURCHASE_PRODUCT,
 PURCHASE_PRODUCT, DESTROY_PRODUCT, EDIT_PRODUCT, PRODUCT_BY_ID,
},
} = Product;

export const WithAll = component => graphql(ALL_PRODUCTS, {
   props: ({ data, }) =>
    ({ WithAll: data, products: getProducts(data), }),
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
  skip: ({ id, }) => !id,
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

export const WithPurchase = component => WithCurrent(graphql(PURCHASE_PRODUCT, {
  options: { refetchQueries: [ 'GetCurrentUser', ], },
  skip: ({ currentUser, purchases, product, }) =>
   !currentUser || isInCart(purchases)(product),
  props: ({ mutate, ownProps: { product, currentUser: { id: uid, }, }, }) =>
    ({ purchaseProduct: () => purchaseProduct(mutate)(uid)(getID(product)), }),
})(component));

export const WithUnPurchase = component => WithPurchase(graphql(UNPURCHASE_PRODUCT, {
  options: { refetchQueries: [ 'GetCurrentUser', ], },
  skip: ({ currentUser, purchases, product, }) =>
   !currentUser || !isInCart(purchases)(product),
  props: ({ mutate, ownProps: { product, currentUser: { id: uid, }, }, }) =>
   ({ dropProduct: () => dropProduct(mutate)(uid)(product.id), }),
})(component));

export const WithEdit = component => compose(WithUpdate, WithDestroy)(component);
