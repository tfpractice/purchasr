import { spread, } from 'fenugreek-collections';
import { compose, graphql, } from 'react-apollo';
import { Auth, } from 'modules';
import { WithRoles, } from '../containers';
const {
 actions: { userByName, createUser, loginUser, findAndLogin, },
 queries: { GET_USERS, CREATE_USER, LOGIN_USER, CURRENT_USER, },
} = Auth;

const getUser = ({ viewer: { user, }, }) => user;
const getProduct = ({ product, }) => product;
const getPurchases = ({ purchases: { edges, }, } = { purchases: { edges: [], }, }) => { console.log('edges ', edges); return spread(edges); };

const getCart = data => getUser(data) ? getPurchases(getUser(data)) : [];
const getSales = user => user ? user.sales.edges.map(({ node, }) => node) : [];

export const WithFind = component => WithRoles(graphql(GET_USERS, {
  props: ({ data, }) =>
    ({ findUser: userByName(data), }),
})(component));

export const WithUsers = WithFind;

export const WithRegister = component => (graphql(CREATE_USER, {
  props: ({ mutate, }) =>
    ({ createUser: createUser(mutate), }),
})(component));

export const WithLogin = component => WithRoles(graphql(LOGIN_USER, {
  options: { refetchQueries: [ 'GetCurrentUser', 'GetRoles', ], },
  props: ({ mutate, }) =>
    ({ loginUser: loginUser(mutate), }),
})(component));

export const WithCurrent = component => (graphql(CURRENT_USER, {
  options:  { variables: { sWhere: { status: { eq: 'PENDING', }, }, }, },
  props: ({ data, ...rest }) => ({
      userData: data,
      currentUser: getUser(data),
      purchases: getCart(data),
      sales: getSales(getUser(data)),
  }),
})(component));

export const WithFindAndLogin = component => compose(WithFind, WithRegister, WithLogin,
  graphql(CURRENT_USER, {
    props: ({ ownProps: { findUser, loginUser, createUser, }, }) =>
    ({
 login: (a) => {
   console.log('logging in');
   return findAndLogin(findUser)(createUser)(loginUser)(a);
 },
    }),
  }))(component);

export const LoginChain = component => WithFindAndLogin(component);
