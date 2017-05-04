import { first, } from 'fenugreek-collections';
import { getData, viewNodes, } from 'utils';

const makeUser = cFunc => input => cFunc(input).then(() => input);
const newIfNull = cFunc => input => user => user ? input : makeUser(cFunc)(input);

export const userByName = data => ({ username, }) =>
  data.refetch({ where: { username: { eq: username, }, }, })
    .then(getData).then(viewNodes).then(first);

export const createUser = mutation => input =>
  mutation({ variables: { input, }, });

export const loginUser = mutation => input =>
  mutation({ variables: { input, }, });

export const setToken = (u) => {
  localStorage.setItem('purchasr_token', u.data.loginUser.token);
  localStorage.setItem('user', JSON.stringify(u.data.loginUser.user));
};

export const addRole = mutate => userId => roleId =>
  mutate({ variables: { input: { roleId, userId, accessLevel: 'readwrite', }, }, });

export const updateRole = mutate => userId => roleId =>
  mutate({ variables: { input: { roleId, userId, accessLevel: 'readwrite', }, }, });

export const dropRole = mutate => userId => roleId =>
  mutate({ variables: { input: { roleId, userId, accessLevel: 'readwrite', }, }, });

export const findAndLogin = findU => createU => loginU => input =>
  findU(input)
    .then(newIfNull(createU)(input))
    .then(loginU)
    .then(setToken)
    .catch(console.error);
