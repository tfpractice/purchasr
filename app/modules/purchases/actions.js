
const qt = { quantity: 1, };

export const purchaseProduct = mutate => userId => productId => (input = qt) =>
  mutate({ variables: { input: { ...input, userId, productId, }, }, });

export const dropProduct = mutate => userId => productId =>
  mutate({ variables: { input: { userId, productId, }, }, });
