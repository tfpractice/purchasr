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
    mutation LoginUserMutation($input: LoginUserInput!) {
      loginUser(input: $input) {
        token
        user {
          username
        }
      }
    }
    `;
    
export const LoginWithData2 = component =>
  graphql(CreateUser, {
        name: 'createUser',
        options: (ops) => { console.log('ops', ops); return ops; },
        props: (cArgs) => {
          console.log('cArgs', cArgs);
          return ({ ...cArgs, signUp: data => cArgs.mutate({ variables: { user: data, }, }), });
        },
  })(component);
      
export const LoginWithData = component =>
      compose(graphql(CreateUser, {
          name: 'createUser',
          options: (ops) => { console.log('ops', ops); return ops; },
          props: ({ createUser, }) => ({ createUser: user => createUser({ variables: { user, }, }), }),
      }),
        graphql(LoginUser, {
            name: 'loginUser',
            options: (ops) => { console.log('opslog', ops); return ops; },

            props: ({ loginUser, ownProps: { createUser, ...loginArgs }, }) => {
              console.log('loginArgs', loginArgs);
              return ({
                       loginUser,
                       ...loginArgs,
                       login: input => createUser(input)
                         .then(x => loginUser({ variables: { input, }, })),
              });
            },
        })
        )(component);
