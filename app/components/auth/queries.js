import gql from 'graphql-tag';
import { compose, graphql, } from 'react-apollo';

export const getUsers = gql`
query GetUsers($where:[UserWhereArgs] $first:Int) {
  viewer {
    allUsers(where:$where first:$first) {
      edges {
        node {
          id
          name
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

const login = createUser => data =>
  createUser({ variables: { user: data, }, })
    .then(x => console.log('x', x) && x)
    .catch(console.error);

export const LoginWithData = component =>
  graphql(CreateUser, {
        name: 'createUser',
        options: (ops, ...createUserRest) => {
          console.log('ops, createUserRest', ops, createUserRest);
          return ops;
        },
        
        props: ({ createUser, ...cArgs }) => {
          console.log('cArgs', cArgs);
          
          // return ({ ...cArgs, login: data => createUser({ variables: { user: data, }, }), });
          return ({ login: login(createUser), });
        },
      })(component);

export const LoginWithData2 = component =>
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
