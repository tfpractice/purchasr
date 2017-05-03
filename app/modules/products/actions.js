import { spread, } from 'fenugreek-collections';
import { viewEdges, viewNodes, } from 'utils';

export const sortProducts = data => field =>
  data.refetch({ orderBy: { field, direction: 'ASC', }, });
  
export const createProduct = mutate => input =>
  mutate({ variables: { input, }, });

export const editProduct = mutate => id => input =>
  mutate({ variables: { input: { id, ...input, }, }, });

export const destroyProduct = mutate => id => () =>
  mutate({ variables: { input: { id, }, }, });

export const purchaseProduct = mutate => userId => productId => (input = { quantity: 1, }) =>
  mutate({ variables: { input: { ...input, userId, productId, }, }, });

export const dropProduct = mutate => userId => productId =>
  mutate({ variables: { input: { userId, productId, }, }, });
