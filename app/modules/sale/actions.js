import { viewEdges, viewNodes, } from 'utils';
const defs = { count: 0, status: 'PENDING', };

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
        stock: sale.product.stock - (sale.count - input.count),
      },
    },
  });

export const unSellAndUpdate = mutate => sale =>
    mutate({
      variables: {
        input: { id: sale.id, },
        pInput: {
           id: sale.product.id,
           stock: sale.product.stock - (-sale.count),
        },
      },
    });
