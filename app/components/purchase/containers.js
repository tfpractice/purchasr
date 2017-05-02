import { compose, graphql, } from 'react-apollo';
import { Product, Purchases, } from 'modules';
import { WithCurrent, } from '../auth';
import { WithUpdate, } from '../products';

const { actions: { dropProduct, purchaseProduct, }, } = Purchases;
const { queries: { UNPURCHASE_PRODUCT, PURCHASE_PRODUCT, }, } = Purchases;

const getID = ({ id, }) => id;

export const isInCart = cart => product =>
  new Set(cart.map(getID)).has(getID(product));

export const WithPurchase = component => compose(WithCurrent, WithUpdate)(graphql(PURCHASE_PRODUCT, {
  options: { refetchQueries: [ 'GetCurrentUser', ], },
  skip: ({ currentUser, purchases, product, }) => !currentUser || isInCart(purchases)(product),
  props: ({ mutate, ownProps: { product, currentUser: { id: uid, }, updateProduct, }, }) =>
    ({
      purchaseProduct: qt => purchaseProduct(mutate)(uid)(product.id)(qt)
        .then(p => updateProduct({ id: product.id, stock: product.stock - qt.quantity, })),
    }),
})(component));

//
// export const WithUnPurchase = component => WithPurchase(graphql(UNPURCHASE_PRODUCT, {
//   options: { refetchQueries: [ 'GetCurrentUser', ], },
//   skip: ({ currentUser, purchases, product, }) => !currentUser || !isInCart(purchases)(product),
//   props: ({ mutate, ownProps: { product, currentUser: { id: uid, }, }, }) =>
//    ({ dropProduct: () => dropProduct(mutate)(uid)(product.id), }),
// })(component));
