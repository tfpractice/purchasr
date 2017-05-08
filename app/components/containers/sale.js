import { compose, graphql, } from 'react-apollo';
import { Sale, } from 'modules';
import { WithCurrent, } from './auth';
import { WithProduct, } from './products';

const { actions: { sellAndUpdate, unSellAndUpdate, editAndUpdate, }, } = Sale;
const { queries: { SELL_AND_UPDATE, GET_SALE, EDIT_SALE_AND_UPDATE, UNSELL_AND_UPDATE, }, } = Sale;

export const WithSale = component => graphql(GET_SALE, {
    skip: ({ sale, }) => !sale,
    options: ({ sale: { id, }, }) => ({ variables: { id, }, }),
    props: ({ data: saleData, }) => ({ saleData, }),
})(component);
  
export const WithSell = component =>
  compose(WithCurrent, WithProduct)(graphql(SELL_AND_UPDATE, {
    options: { refetchQueries: [ 'GetCurrentUser', ], },
    skip: ({ currentUser, }) => !currentUser,
    props: ({ mutate, ownProps: { product, currentUser: u, }, }) =>
      ({ buyProduct: input => sellAndUpdate(mutate)(u.id)(product)(input), }),
  })(component));

export const WithEditSale = component =>
  compose(WithSell)(graphql(EDIT_SALE_AND_UPDATE, {
    skip: ({ sale, }) => !sale,
    props: ({ mutate, ownProps: { sale, }, }) =>
      ({ buyProduct: input => editAndUpdate(mutate)(sale)(input), }),
  })(component));

export const WithUnSell = component =>
  WithEditSale(graphql(UNSELL_AND_UPDATE, {
    options: { refetchQueries: [ 'GetCurrentUser', ], },
    skip: ({ sale, }) => !sale,
    props: ({ mutate, ownProps: { sale, }, }) =>
      ({ unsell: () => unSellAndUpdate(mutate)(sale), }),
  })(component));
