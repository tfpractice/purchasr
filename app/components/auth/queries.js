import gql from 'graphql-tag';
import { spread, } from 'fenugreek-collections';
import { compose, graphql, withApollo, } from 'react-apollo';

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
}
`;

export const CreateUser = gql`
   mutation CreateUserMutation($input: CreateUserInput!) {
     createUser(input: $input) {
       changedUser {
         username
       }
     }
   }
   `;

export const LoginUser = gql`
     mutation LoginUserMutation($input: LoginUserInput!) {
       loginUser(input: $input) {
         token
         user {
           username
         }
       }
     }
     `;
     
const getEdges = ({ data: { viewer: { allUsers: { edges, }, }, }, },
) => spread(edges);

export const executeFind = client => ({ username, }) =>
  client.query({ query: GetUsers, variables: { where: { username: { eq: username, }, }, }, })
    .then(getEdges).catch(console.error);

export const fetchByName = query => input =>
query.refetch({ where: { username: { eq: username, }, }, });
const isEmpty = (edges = []) => edges.length === 0;

const log = ({ findUser, createUser, login, }) => input =>
Promise.resolve(findUser(input))
  .then(edges => isEmpty(edges) ?
     createUser({ variables: { input, }, })
     : login({ variables: { input, }, }))
  .then(u => console.log('login u', u) && u)
  .catch(console.error);

export const WithFind = component => graphql(GetUsers, {
       name: 'getUsers',
       props: ({ getUsers, ownProps: { client, }, ...other }, ) => {
         console.log('GetUsers', getUsers, other);
         return ({ byName: ({ username, }) => getUsers.refetch({ where: { username: { eq: username, }, }, first: 1, }, ), findUser: executeFind(client), });
       },
})(component);

export const WithCreate = component => graphql(CreateUser, {
   name: 'createUser',
   props: ({ createUser, ownProps: { client, }, }) => ({ createUser, findUser: executeFind(client), }),
})(component);

export const WithLogin = component => graphql(LoginUser, {
   name: 'login',
   props: ({ login, ownProps: { findUser, createUser, }, }) => ({ login: log({ login, findUser, createUser, }), }),
})(component);

export const LoginChain = component =>
   compose(withApollo, WithFind, WithCreate, WithLogin)(component);
