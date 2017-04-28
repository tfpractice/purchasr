import { compose, graphql, } from 'react-apollo';
import gql from 'graphql-tag';
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
  props: ({ mutate, }) =>
    ({ loginUser: loginUser(mutate), }),
})(component);

export const WithFindAndLogin = component => compose(WithFind, WithCreate, WithLogin,
  graphql(GET_USERS, {
  props: ({ ownProps: { findUser, loginUser, createUser, }, }) =>
    ({ login: findAndLogin(findUser)(createUser)(loginUser), }),
  }))(component);

export const LoginChain = component => WithFindAndLogin(component);
