import { viewEdges, viewNodes, } from 'utils';
import { CURRENT_USER, } from '../auth/queries';
import { GET_SALE, } from './queries';
import { SALE_INFO, } from './fragments';
const defs = { count: 0, status: 'PENDING', };
const sameID = next => ({ id, }) => next.id === id;
const replace = next => ({ node: prev, }) => sameID(next)(prev) ? ({ node: next, }) : ({ node: prev, });
const updateRes = next => oldRes => oldRes.map(replace(next));

export const createSale = mutate => userId => productId => (input = defs) =>
  mutate({ variables: { input: { ...input, productId, userId, }, }, });

export const editSale = mutate => id => input =>
  mutate({ variables: { input: { id, ...input, }, }, });

export const destroySale = mutate => id => () =>
  mutate({ variables: { input: { id, }, }, });

export const sellAndUpdate = mutate => userId => product => (input = defs) =>
    mutate({
      variables: {
        input: { ...input, productId: product.id, userId, },
        pInput: { id: product.id, stock: product.stock - input.count, },
      },
    });

export const editAndUpdate = mutate => sale => (input = defs) =>
mutate({
    variables: {
      input: { ...input, id: sale.id, },
      pInput: {
        id: sale.product.id,
        stock: sale.product.stock - (input.count - sale.count),
      },
    },
    refetchQueries: [ 'GetSale', ],
    //
    // update: (proxy, { data: { updateSale: { sale, }, }, }) => {
    //   const data = proxy.readQuery({ query: GET_SALE, variables: { id: sale.id, }, });
    //
    //   console.log('_____________CUREN_USER_QUERY____________',);
    //   console.log('_____________CUREN_USER_QUERY____________',);
    //   console.log('_____________CUREN_USER_QUERY____________',);
    //
    //   console.log('data', data);
    //
    //   console.log('proxy', proxy);
    //
    //   console.log('sale', sale);
    //
    //   console.log('_____________CUREN_USER_QUERY____________',);
    //   console.log('_____________CUREN_USER_QUERY____________',);
    //   console.log('_____________CUREN_USER_QUERY____________',);
    //   console.log('_____________CUREN_USER_QUERY____________',);
    //
    //   console.log('      proxy.writeQuery({ query: CURRENT_USER, data, });', proxy.writeQuery({ query: CURRENT_USER, data, }));
    //   proxy.writeQuery({ query: CURRENT_USER, data, });
    // },
    //
    // updateQueries: {
    //   GetSale: (prev, { mutationResult: { data: { updateSale: { sale, }, }, }, }) => {
    //     console.log('mutationResult', sale);
    //     console.log('PREV', prev);
    //     return ({ ...prev, getSale: sale, });
    //   },
    // },
});

export const unSellAndUpdate = mutate => sale => mutate({
      variables: {
        input: { id: sale.id, },
        pInput: {
          id: sale.product.id,
          stock: sale.product.stock - (-sale.count),
        },
      },
});
