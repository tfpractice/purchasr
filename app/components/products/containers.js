// export * from '../containers/products';

// import { compose, graphql, } from 'react-apollo';
// import { getID, viewNodes, } from 'utils';
// import { Product, } from 'modules';
//
// const {
//   actions:  { createProduct, destroyProduct, editProduct, sortProducts, },
//   queries:  { ALL_PRODUCTS, CREATE_PRODUCT, DESTROY_PRODUCT, EDIT_PRODUCT, PRODUCT_BY_ID, },
// } = Product;
//
// export const WithAll = component => graphql(ALL_PRODUCTS, {
//   options: { variables: { where: { stock: { gt: 0, }, }, }, },
//   props: ({ data, }) => ({
//     productsData: data,
//     products: viewNodes(data),
//     byPrice: () => sortProducts(data)('price'),
//     byStock: () => sortProducts(data)('stock'),
//   }),
// })(component);
//
// export const WithCreate = component => graphql(CREATE_PRODUCT, {
//    props: ({ mutate, }) =>
//    ({ createProduct: createProduct(mutate), }),
//    options: { refetchQueries: [ 'GetAllProducts', ], },
// })(component);
//
// export const WithProduct = component => graphql(PRODUCT_BY_ID, {
//   skip:  ({ id, } = { id: '', }) => !id,
//   options: ({ ownProps: { id, }, }) => ({ variables: { id, }, }),
//   props: ({ data, }) => ({ getProduct: data, }),
// })(component);
//
// export const WithUpdate = component => graphql(EDIT_PRODUCT, {
//   skip: ({ id, }) => false,
//   props: ({ mutate, ownProps: { id, }, }) =>
//     ({ updateProduct: editProduct(mutate)(id), }),
//   options: { refetchQueries: [ 'GetAllProducts', ], },
// })(component);
//
// export const WithDestroy = component => graphql(DESTROY_PRODUCT, {
//   skip: ({ id, }) => !id,
//   props: ({ mutate, ownProps: { id, }, }) =>
//    ({ destroyProduct: destroyProduct(mutate)(id), }),
//   options: { refetchQueries: [ 'GetAllProducts', ], },
// })(component);
//
// export const isInCart = cart => product =>
//   new Set(cart.map(getID)).has(getID(product));
//
// export const WithEdit = component => compose(WithUpdate, WithDestroy)(component);
