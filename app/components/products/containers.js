import { compose, graphql, } from 'react-apollo';
import { ProductActions, ProductQueries, } from 'modules';
import { Auth, Product, } from 'modules';
import { WithCurrent, } from '../auth/containers';

const {
 actions:
  { createProduct, destroyProduct, editProduct, purchaseProduct, getProducts, },
queries:
  {
 ALL_PRODUCTS, CREATE_PRODUCT,
     PURCHASE_PRODUCT, DESTROY_PRODUCT, EDIT_PRODUCT, PRODUCT_BY_ID,
},
} = Product;
const { queries: { CURRENT_USER, }, } = Auth;

export const WithAll = component => graphql(ALL_PRODUCTS, {
  props: ({ data, }) =>
   ({ data, products: getProducts(data), }),
})(component);

export const WithCreate = component => graphql(CREATE_PRODUCT, {
  options: { refetchQueries: [ 'GetAllProducts', ], },
  props: ({ mutate, }) => ({ createProduct: createProduct(mutate), }),
})(component);

export const WithProduct = component => graphql(PRODUCT_BY_ID, {
  skip:  ({ id, } = { id: '', }) => !!id,
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

export const WithPurchase = component => WithCurrent(graphql(PURCHASE_PRODUCT, {
  skip: ({ currentUser, }) => !currentUser,
  props: ({ mutate, ownProps: { product: { id: pid, }, currentUser: { id: uid, }, }, }) =>
   ({ purchaseProduct: () => purchaseProduct(mutate)(uid)(pid), }),
})(component));

export const WithEdit = component => compose(WithUpdate, WithDestroy)(component);
