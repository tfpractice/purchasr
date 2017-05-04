
const qt = { quantity: 1, };

export const purchaseProduct = mutate => userId => productId => (input = qt) =>
  mutate({
  variables: {
    input: { ...input, userId, productId, },
    pInput: { id: productId, stock: input.quantity * 2, },
  },
  });
  
export const buyAndUpdate = mutate => userId => product => (input = qt) =>
    mutate({
      variables: {
        input: { ...input, userId, productId: product.id, },
        pInput: { id: product.id, stock: product.stock - input.quantity, },
      },
    });

export const dropProduct = mutate => userId => productId =>
  mutate({ variables: { input: { userId, productId, }, }, });

// export const buyAndUpdate
