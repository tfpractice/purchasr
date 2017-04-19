import gql from 'graphql-tag';
import { graphql, } from 'react-apollo';

export const CreateUser = gql`
  mutation CreateUserMutation($user: CreateUserInput!) {
    createUser(input: $user) {
      changedUser {
        username
      }
    }
  }
  `;

export const LoginWithData = component =>
  graphql(CreateUser, {
    props: ({ mutate, }) =>
    ({ login: data => mutate({ variables: { user: data, }, }), }),
  })(component);
