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
  mutation CreateUserMutation($user: CreateUserInput!) {
    createUser(input: $user) {
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

const find = ({ updateQuery, ...uqrest }) => (input) => {
  const up = (prev, { variables, }) => prev;

  return updateQuery(up);
};
    
const addUser = mutation => user =>
  mutation({ variables: { user, }, })
    .then(x => console.log('x', x) && x)
    .catch(console.error);

const loginU = mutation => input =>
  mutation({ variables: { input, }, })
    .then(x => console.log('x', x) && x)
    .catch(console.error);
    
const chain = ({ login, findUser, createUser, }, ) => input =>
 findUser(input).then(x => createUser(input)).catch(console.error);

export const executeFind = client => ({ username, }) => {
  client.query({ query: GetUsers, variables: { where: { username: { eq: username, }, }, }, })
    .then(x => console.log('x datat from executeFind', x) && x);
};
export const WithFind = component => graphql(GetUsers, {
  name: 'getUsers',
  props: ({ getUsers, ownProps, }, ) => {
    console.log('props, alt', getUsers, ownProps);

    return ({ getUsers, findUser: find(getUsers), exec: executeFind(ownProps.client), });
  },
})(component);

export const WithCreate = component => graphql(CreateUser, {
  name: 'createUser',
  props: ({ createUser, ...WithCreateArgs }) => {
    console.log('WithCreateArgs', WithCreateArgs);
    return ({ createUser: addUser(createUser), ...WithCreateArgs, });
  },
})(component);

export const WithLogin = component => graphql(CreateUser, {
  name: 'login',
  props: ({ login, ownProps: { getUsers, findUser, createUser, }, ...WithLoginArgs }) => {
    console.log('WithLoginArgs', WithLoginArgs);
    return ({ login: chain({ login, findUser, createUser, }), ...WithLoginArgs, });
  },
})(component);

export const LoginWithData = component =>
  graphql(CreateUser, {
        name: 'createUser',
        props: ({ createUser, ...cArgs }) => ({ login: login(createUser), }),
  })(component);

export const LoginChain = component =>
  compose(withApollo, WithFind, WithCreate, WithLogin)(component);
