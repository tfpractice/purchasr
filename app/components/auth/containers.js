import { spread, } from 'fenugreek-collections';
import { compose, graphql, } from 'react-apollo';
import { Auth, } from 'modules';

const {
 actions: { userByName, createUser, loginUser, findAndLogin, },
 queries: { GET_USERS, CREATE_USER, LOGIN_USER, CURRENT_USER, },
} = Auth;

export const WithFind = component => graphql(GET_USERS, {
  props: ({ data, }) =>
    ({ findUser: userByName(data), }),
})(component);

export const WithCreate = component => graphql(CREATE_USER, {
  props: ({ mutate, }) =>
    ({ createUser: createUser(mutate), }),
})(component);

export const WithLogin = component => graphql(LOGIN_USER, {
  options: { refetchQueries: [ 'GetCurrentUser', ], },

  props: ({ mutate, }) =>
    ({ loginUser: loginUser(mutate), }),
})(component);

const getUser = ({ viewer: { user, }, }) => user;
const getPurchases = ({ purchases: { edges, }, } = { purchases: { edges: [], }, }) =>
spread(edges);

const getCart = data => getUser(data) ? getPurchases(getUser(data)) : [];

export const WithCurrent = component => graphql(CURRENT_USER, {
  props: ({ data, }) => {
    console.log('getUser(data)', getUser(data));
    return ({ userData: data, currentUser: getUser(data), purchases: getCart(data), });
  },
})(component);

export const WithFindAndLogin = component => compose(WithFind, WithCreate, WithLogin,
  graphql(CURRENT_USER, {
    props: ({ ownProps: { findUser, loginUser, createUser, }, }) =>
    ({ login: findAndLogin(findUser)(createUser)(loginUser), }),
  }))(component);

export const LoginChain = component => WithFindAndLogin(component);
