import { compose, graphql, } from 'react-apollo';
import { Purchases, Sale, } from 'modules';
import { getID, } from 'utils';
import { WithCurrent, } from './auth';
import { WithProduct, WithUpdate, } from './products';

const { actions: { createSale, sellAndUpdate, unSellAndUpdate, editAndUpdate, editSale, destroySale, }, } = Sale;
const { queries: { CREATE_SALE, SELL_AND_UPDATE, GET_SALE, EDIT_SALE_AND_UPDATE, UNSELL_AND_UPDATE, EDIT_SALE, DESTROY_SALE, }, } = Sale;

export const WithSale = component => graphql(GET_SALE, {
    skip: ({ sale, }) => !sale,
    options: ({ sale: { id, }, }) => ({ variables: { id, }, }),
    props: ({ data: saleData, }) => ({ saleData, }),
})(component);
  
export const WithCreateSale = component =>
  compose(WithCurrent)(graphql(CREATE_SALE, {
    options: { refetchQueries: [ 'GetCurrentUser', ], },
    skip: ({ currentUser, }) => !currentUser,
    props: ({ mutate, ownProps: { product: p, currentUser: u, }, }) =>
      ({ createSale: input => createSale(mutate)(u.id)(p.id)(input), }),
  })(component));
  
export const WithSell = component =>
  compose(WithCurrent, WithProduct)(graphql(SELL_AND_UPDATE, {
    options: { refetchQueries: [ 'GetProduct', ], },
    skip: ({ currentUser, }) => !currentUser,
    props: ({ mutate, ownProps: { product, currentUser: u, ...own }, }) => {
      console.log('WithSellown', own);
      
      return ({ buyProduct: input => sellAndUpdate(mutate)(u.id)(product)(input), });
    },
  })(component));

export const WithEditSale = component =>
  WithSell(graphql(EDIT_SALE_AND_UPDATE, {
    options: (props) => { console.log('WithEditSaleprops', props); return ({ refetchQueries: [ 'GetSale', ], }); },
    skip: ({ sale, }) => !sale,
    props: ({ mutate, ownProps: { sale, }, }) =>
      ({ buyProduct: input => editAndUpdate(mutate)(sale)(input), }),
  })(component));

export const WithUnSell = component =>
  WithEditSale(graphql(UNSELL_AND_UPDATE, {
    options: { refetchQueries: [ 'GetSale', ], },
    skip: ({ sale, }) => !sale,
    props: ({ mutate, ownProps: { sale, }, }) =>
      ({ unsell: () => unSellAndUpdate(mutate)(sale), }),
  })(component));
