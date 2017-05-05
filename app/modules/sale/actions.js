import { viewEdges, viewNodes, } from 'utils';
const defs = { count: 0, status: 'PENDING', };

export const createSale = mutate => userId => productId => (input = defs) => {
  console.log('input', input);
  return mutate({ variables: { input: { ...input, productId, userId, }, }, });
};

export const editSale = mutate => id => input =>
  mutate({ variables: { input: { id, ...input, }, }, });

export const destroySale = mutate => id => () =>
  mutate({ variables: { input: { id, }, }, });

export const dropSale = mutate => userId => productId =>
  mutate({ variables: { input: { userId, productId, }, }, });

//
// export const purchaseSale = mutate => userId => productId => (input = { quantity: 1, }) =>
//     mutate({ variables: { input: { ...input, userId, productId, }, }, });
