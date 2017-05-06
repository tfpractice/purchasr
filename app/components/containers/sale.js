import { compose, graphql, } from 'react-apollo';
import { Purchases, Sale, } from 'modules';
import { getID, } from 'utils';
import { WithCurrent, } from './auth';
import { WithUpdate, } from './products';

const { actions: { createSale, sellAndUpdate, unSellAndUpdate, editAndUpdate, editSale, destroySale, }, } = Sale;
const { queries: { CREATE_SALE, SELL_AND_UPDATE, EDIT_SALE_AND_UPDATE, UNSELL_AND_UPDATE, EDIT_SALE, DESTROY_SALE, }, } = Sale;

export const WithSale = component =>
  compose(WithCurrent, WithUpdate)(graphql(GET_SALE, {
    skip: ({ id, }) => !id,
    options: ({ id, }) => ({ variables: { id, }, }),
    props: ({ data, }) => { console.log('sale data', data); return data; },

  })(component));
  
export const WithCreateSale = component =>
  compose(WithCurrent, WithUpdate)(graphql(CREATE_SALE, {
    options: { refetchQueries: [ 'GetCurrentUser', ], },
    skip: ({ currentUser, }) => !currentUser,
    props: ({ mutate, ownProps: { product: p, currentUser: u, }, }) =>
      ({ createSale: input => createSale(mutate)(u.id)(p.id)(input), }),
  })(component));
  
export const WithSell = component =>
  compose(WithCurrent, WithUpdate)(graphql(SELL_AND_UPDATE, {
    options: { refetchQueries: [ 'GetCurrentUser', ], },
    skip: ({ currentUser, }) => !currentUser,
    props: ({ mutate, ownProps: { product, currentUser: u, }, }) =>
      ({ buyProduct: input => sellAndUpdate(mutate)(u.id)(product)(input), }),
  })(component));

export const WithEditSale = component =>
  WithSell(graphql(EDIT_SALE_AND_UPDATE, {
    options: { refetchQueries: [ 'GetCurrentUser', ], },
    skip: ({ sale, }) => !sale,
    props: ({ mutate, ownProps: { sale, }, }) =>
      ({ editSale: input => editAndUpdate(mutate)(sale)(input), }),
  })(component));

export const WithUnSell = component =>
  WithEditSale(graphql(UNSELL_AND_UPDATE, {
    options: { refetchQueries: [ 'GetCurrentUser', ], },
    skip: ({ sale, }) => !sale,
    props: ({ mutate, ownProps: { sale, }, }) =>
      ({ unsell: () => unSellAndUpdate(mutate)(sale), }),
  })(component));
