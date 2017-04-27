import { spread, } from 'fenugreek-collections';

export const getProducts = ({ viewer: { allProducts: { edges, }, }, }) =>
  spread(edges).map(({ product, }) => product);

export const createProduct = mutate => input =>
  mutate({ variables: { input, }, });

export const editProduct = mutate => id => input =>
  mutate({ variables: { input: { id, ...input, }, }, });

export const destroyProduct = mutate => id => () =>
  mutate({ variables: { input: { id, }, }, });