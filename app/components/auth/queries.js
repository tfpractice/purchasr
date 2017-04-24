import gql from 'graphql-tag';
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
) => (edges);

export const executeFind = client => ({ username, }) => {
  client.query({ query: GetUsers, variables: { where: { username: { eq: username, }, }, }, })
    .then(getEdges);
};

const isEmpty = (edges = []) => { console.log('isEmpty edges', edges); return edges.length === 0; };

const log = ({ findUser, createUser, login, }) => input =>
Promise.resolve(findUser(input)).then(isEmpty)
  .then((edges) => {
    console.log('edges', edges, isEmpty(edges));
    return login({ variables: { input, }, });

    // return !edges ? login({ variables: { input, }, })
    //   : createUser({ variables: { input, }, });
  })
  .then(u => console.log('login u', u) && u)
  .catch(e => console.error('errroorr', e));

export const WithFind = component => graphql(GetUsers, {
      name: 'getUsers',
      props: ({ ownProps: { client, }, }, ) => ({ findUser: executeFind(client), }),
})(component);

export const WithCreate = component => graphql(CreateUser, {
  name: 'createUser',
  props: ({ createUser, ownProps: { client, }, }) => ({ createUser, findUser: executeFind(client), }),
})(component);

export const WithLogin = component => graphql(LoginUser, {
  name: 'login',
  props: ({ login, ownProps: { findUser, createUser, }, }) => {
    console.log('WithLoginArgs', login);
    
    return ({ login2: input => login({ variables: { input, }, }), login: log({ login, findUser, createUser, }), });
  },
})(component);

export const LoginChain = component =>
  compose(withApollo, WithCreate, WithLogin)(component);
