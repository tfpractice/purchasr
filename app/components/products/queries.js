import gql from 'graphql-tag';

export const byID = gql`
  query GetProduct($id: ID!){
    product {
      id
      name
      price
    }
  }`;

export const all = gql`
  query GetAllProducts {
    viewer {
      allProducts {
        edges {
           product:node {
            id
            name
            price
          }
        }
      }
    }
  }`;

export const create = gql`
   mutation CreateProductMutation($input: CreateProductInput!) {
     createProduct(input: $input) {
       product:changedProduct {
         id
         name
         price
       }
     }
   }`;

export const edit = gql`
  mutation UpdateProductMutation($input: UpdateProductInput!) {
    updateProduct(input: $input) {
      changedProduct {
        name
        price
      }
    }
  }`;

export const destroy = gql`
  mutation DeleteProductMutation($id: ID!) {
    deleteProduct(id: $id) {
      changedProduct {
        name
        price
      }
    }
  }`;

//
// const create = ({ data, mutate, }) => input =>
// mutate({ variables: { input, }, }).then(res => data.refetch().then(x =>
// res));
//
// export const WithAllProducts = component => graphql(AllProducts, {
//   name: 'products',
//   props: ({ products, ownProps: allProps, }) => {
//     console.log('allProps', allProps);
//     return ({ products: products.viewer.allProducts.edges.map(({ node, }) => node), });
//   },
// })(component);
//
// export const WithCreateProduct = component => graphql(CreateProduct, {
//     name: 'createProduct',
//     props: ({ createProduct, ownProps, }) => {
//       console.log('ownProps', ownProps);
//       return ({ createProduct: input => createProduct({ variables: { input, }, }), });
//     },
// })(component);
//
// export const WithProduct = component => graphql(GetProduct, {
//     name: 'getProduct',
//     skip:  ({ id, } = { id: '', }) => !id,
//     options: ({ getProduct, ownProps: { id, }, }) => ({ variables: id, }),
//     props: ({ getProduct, ownProps, }) => ({ ownProps, getProduct, }),
// })(component);
//
// export const WithUpdateProduct = component => graphql(UpdateProduct, {
//   name: 'updateProduct',
//   skip:  ({ id, } = { id: '', }) => !id,
//   props: ({ updateProduct, ownProps: { id, }, }) =>
//    ({ updateProduct: input => updateProduct({ variables: { input: { id, ...input, }, }, }), }),
// })(component);
//
// export const WithDeleteProduct = component => graphql(DeleteProduct, {
//     name: 'deleteProduct',
//     skip:  ({ id, } = { id: '', }) => !id,
//     props: ({ deleteProduct, ownProps: { id = '', }, }) =>
//     ({ deleteProduct: () => deleteProduct({ variables: id, }), }),
// })(component);
//
// const CRUDProduct = component =>
//    compose(WithProduct, WithUpdateProduct, WithDeleteProduct)(component);
//
// export const ViewProducts = component =>
//     compose(WithAllProducts, WithCreateProduct, )(component);
//
// export default CRUDProduct;
