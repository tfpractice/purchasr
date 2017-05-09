
export const addRole = mutate => userId => roleId =>
  mutate({ variables: { input: { roleId, userId, accessLevel: 'readwrite', }, }, });

export const updateRole = mutate => userId => roleId =>
  mutate({ variables: { input: { roleId, userId, accessLevel: 'readwrite', }, }, });

export const dropRole = mutate => userId => roleId =>
  mutate({ variables: { input: { roleId, userId, accessLevel: 'readwrite', }, }, });
