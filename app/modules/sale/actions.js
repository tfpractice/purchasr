import { viewEdges, viewNodes, } from 'utils';

export const createSale = mutate => product => user => input =>
mutate({ variables: { input: { ...input, product, user, }, }, });

export const editSale = mutate => id => input =>
  mutate({ variables: { input: { id, ...input, }, }, });

export const destroySale = mutate => id => () =>
  mutate({ variables: { input: { id, }, }, });

export const dropSale = mutate => userId => productId =>
  mutate({ variables: { input: { userId, productId, }, }, });

//
// export const purchaseSale = mutate => userId => productId => (input = { quantity: 1, }) =>
//     mutate({ variables: { input: { ...input, userId, productId, }, }, });
