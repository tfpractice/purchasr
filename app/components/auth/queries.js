import gql from 'graphql-tag';
import { compose, graphql, } from 'react-apollo';

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
    mutation LoginUserMutation($user: CreateUserInput!) {
      loginUser(input: $user) {
        token
        user {
          username
        }
      }
    }
    `;
    
export const LoginWithData = component =>
  graphql(CreateUser, {
        name: 'createUser',
        options: (ops) => { console.log('ops', ops); return ops; },
        props: (cArgs) => {
          console.log('cArgs', cArgs);
          return ({ ...cArgs, signUp: data => cArgs.mutate({ variables: { user: data, }, }), });
        },
  })(component);
      
export const LoginWithDataComposed = component =>
      compose(graphql(CreateUser, {
          name: 'createUser',
          options: (ops) => { console.log('ops', ops); return ops; },
          props: (cArgs) => {
            console.log('cArgs', cArgs);
            return ({ ...cArgs, signUp: data => cArgs.mutate({ variables: { user: data, }, }), });
          },
      }),
        graphql(LoginUser, {
            name: 'LoginUser',
            options: (ops) => { console.log('opslog', ops); return ops; },

            props: (apolloargs) => {
              console.log('apolloargs', apolloargs);
              return ({ ...apolloargs, login: data => apolloargs.ownProps.signUp(data), });
            },
        })
        )(component);
