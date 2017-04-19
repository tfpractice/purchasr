import gql from 'graphql-tag';
import { graphql, } from 'react-apollo';

export const CreateUser = gql `
  mutation CreateUserMutation($data: CreateUserInput!) {
    createUser(input: $data) {
      token
      user {
        id
        username
      }
    }
  }
`;

export const LoginWithData = component =>
  graphql(CreateUser, {
    props: ({ mutate, }) =>
    ({ login: data => mutate({ variables: { data, }, }), }),
  })(component);
