import { compose, graphql, } from 'react-apollo';
import { Purchases, } from 'modules';
import { getID, } from 'utils';
import { WithCurrent, } from './auth';
import { WithUpdate, } from './products';

const { actions: { dropProduct, buyAndUpdate: purchaseProduct, }, } = Purchases;
const { queries: { UNPURCHASE_PRODUCT, BUY_AND_UPDATE: PURCHASE_PRODUCT, }, } = Purchases;

const getQt = ({ quantity, }) => quantity;

export const getProduct = ({ product, }) => product;

const isMatch = p0 => p1 => getID(p0) == getID(p1);
const hasMatch = prod => purchase => isMatch(prod)(getProduct(purchase));
const findMatch = prod => cart => cart.find(hasMatch(prod));

export const isInCart = cart => product =>
  new Set(cart.map(getProduct).map(getID)).has(getID(product));
export const getPQ = p => cart => getQt(findMatch(p)(cart));
const incStock = p => cart => p.stock + getPQ(p)(cart);

export const WithPurchase = component => compose(WithCurrent, WithUpdate)(graphql(PURCHASE_PRODUCT, {
  options: { refetchQueries: [ 'GetCurrentUser', ], },
  skip: ({ currentUser, }) => !currentUser,
  props: ({ mutate, ownProps: { product, currentUser: { id: uid, }, updateProduct, }, }) =>
    ({ purchaseProduct: qt => purchaseProduct(mutate)(uid)(product)(qt), }),
})(component));

export const WithUnPurchase = component => WithPurchase(graphql(UNPURCHASE_PRODUCT, {
  options: { refetchQueries: [ 'GetCurrentUser', ], },
  skip: ({ currentUser, purchases, product, }) =>
   !currentUser || !isInCart(purchases)(product),
  props: ({ mutate, ownProps: { product, currentUser: { id: uid, }, purchases, updateProduct, }, }) =>
  ({
    dropProduct: () => dropProduct(mutate)(uid)(product.id)
      .then(p => updateProduct({ id: product.id, stock: incStock(product)(purchases), })),
  }),
})(component));
