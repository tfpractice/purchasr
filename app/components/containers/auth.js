import { spread, } from 'fenugreek-collections';
import { compose, graphql, } from 'react-apollo';
import { Auth, } from 'modules';
import { viewNodes, } from 'utils';

const {
 actions: { userByName, createUser, loginUser, findAndLogin, addRole, dropRole, },
 queries: { GET_USERS, CREATE_USER, GET_ROLES, LOGIN_USER, DROP_ROLE, ADD_ROLE, CURRENT_USER, },
} = Auth;

export const WithFind = component => graphql(GET_USERS, {
  props: ({ data, }) =>
    ({ findUser: userByName(data), }),
})(component);

export const WithRoles = component => graphql(GET_ROLES, {
  props: ({ data, }) =>
    ({ roleData: data, roles: viewNodes(data), }),
})(component);

export const WithRegister = component => WithRoles(graphql(CREATE_USER, {
  props: ({ mutate, }) =>
    ({ createUser: createUser(mutate), }),
})(component));

export const WithLogin = component => graphql(LOGIN_USER, {
  options: { refetchQueries: [ 'GetCurrentUser', ], },
  
  props: ({ mutate, }) =>
    ({ loginUser: loginUser(mutate), }),
})(component);

const getUser = ({ viewer: { user, }, }) => user;
const getProduct = ({ product, }) => product;
const getPurchases = ({ purchases: { edges, }, } = { purchases: { edges: [], }, }) =>
spread(edges);

// .map(getProduct);

const getCart = data => getUser(data) ? getPurchases(getUser(data)) : [];

export const WithCurrent = component => graphql(CURRENT_USER, {
  props: ({ data, }) =>
   ({ userData: data, currentUser: getUser(data), purchases: getCart(data), }),
})(component);

export const WithAddRole = component => WithCurrent(graphql(ADD_ROLE, {
  skip: ({ roleId, currentUser, }) => !currentUser || !roleId,
  props: ({ mutate, ownProps: { roleId, currentUser, }, }) =>
    ({ addRole: () => addRole(mutate)(currentUser.id)(roleId), }),
})(component));

export const WithDropRole = component => WithAddRole(graphql(DROP_ROLE, {
  skip: ({ roleId, currentUser, }) => !currentUser || !roleId,
  props: ({ mutate, ownProps: { roleId, currentUser, }, }) =>
    ({ dropRole: () => dropRole(mutate)(currentUser.id)(roleId), }),
})(component));

export const WithFindAndLogin = component => compose(WithFind, WithRegister, WithLogin,
  graphql(CURRENT_USER, {
    props: ({ ownProps: { findUser, loginUser, createUser, }, }) =>
    ({ login: findAndLogin(findUser)(createUser)(loginUser), }),
  }))(component);

export const LoginChain = component => WithFindAndLogin(component);
