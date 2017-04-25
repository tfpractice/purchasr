import gql from 'graphql-tag';
import { spread, } from 'fenugreek-collections';
import { compose, graphql, } from 'react-apollo';

const getEdges = ({ data: { viewer: { allUsers: { edges, }, }, }, },
) => spread(edges);

const isEmpty = (edges = []) => edges.length === 0;

export const GetUsers = gql`
  query GetUsers($where:UserWhereArgs $first:Int) {
   viewer {
     allUsers(where:$where first:$first) {
       edges {
         node {
           id
           username
         }
       }
     }
   }
 }`;

export const CreateUser = gql`
  mutation CreateUserMutation($input: CreateUserInput!) {
     createUser(input: $input) {
       token
       viewer{
         id
         user{
           id
           username
         }
       }
       changedUser {
         id
         username
       }
     }
   }`;

export const LoginUser = gql`
     mutation LoginUserMutation($input: LoginUserInput!) {
       loginUser(input: $input) {
         token
         user {
           id
           username
         }
         viewer{
           id
           user{
             id
             username
           }
         }
       }
     }`;

export const userByName = query => ({ username, }) =>
  query.refetch({ where: { username: { eq: username, }, }, }).then(getEdges);

export const createFromInput = mutation => input =>
  mutation({ variables: { input, }, });

const logInput = mutation => input =>
  mutation({ variables: { input, }, });

const findAndLogin = ({ findUser, createUser, loginUser, }) => input =>
   findUser(input)
     .then(u =>
       isEmpty(u) ? createUser(input).then(() => input) : input)
     .then(loginUser)
     .then((user) => {
       localStorage.setItem('purchasr_token', user.data.loginUser.token);
       localStorage.setItem('user', JSON.stringify(user.data.loginUser.user));
     })
     .catch(console.error);

export const WithFind = component => graphql(GetUsers, {
  props: ({ data, }) =>
    ({ findUser: userByName(data), }),
})(component);

export const WithCreate = component => graphql(CreateUser, {
  props: ({ mutation, }) =>
    ({ createUser: createFromInput(mutation), }),
})(component);

export const WithLogin = component => graphql(LoginUser, {
  props: ({ mutate, ownProps: { findUser, createUser, }, }) =>
  ({ login: findAndLogin({ loginUser: logInput(mutate), findUser, createUser, }), }),
})(component);

export const LoginChain = component =>
   compose(WithFind, WithCreate, WithLogin)(component);
