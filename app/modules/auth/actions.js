import { spread, } from 'fenugreek-collections';

const getEdges = ({ data: { viewer: { allUsers: { edges, }, }, }, },
) => spread(edges);

const isEmpty = (edges = []) => edges.length === 0;

export const userByName = data => ({ username, }) =>
  data.refetch({ where: { username: { eq: username, }, }, }).then(getEdges);

export const createUser = mutation => input =>
  mutation({ variables: { input, }, });

export const loginUser = mutation => input =>
  mutation({ variables: { input, }, });

export const setToken = (u) => {
  localStorage.setItem('purchasr_token', u.data.loginUser.token);
  localStorage.setItem('user', JSON.stringify(u.data.loginUser.user));
};

export const findAndLogin = findU => createU => loginU => input =>
  findU(input)
    .then(u => isEmpty(u) ? createU(input).then(() => input) : input)
    .then(loginU)
    .then(setToken)
    .catch(console.error);
