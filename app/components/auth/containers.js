// export const WithFind = component => graphql(GetUsers, {
//   name: 'getUsers',
//   props: ({ getUsers, ownProps, }, ) => {
//     console.log('props, alt', getUsers, ownProps);
//
//     return ({ getUsers, findUser: find(getUsers), exec: executeFind(ownProps.client), });
//   },
// })(component);
//
// export const WithCreate = component => graphql(CreateUser, {
//   name: 'createUser',
//   props: ({ createUser, ...WithCreateArgs }) => {
//     console.log('WithCreateArgs', WithCreateArgs);
//     return ({ createUser: addUser(createUser), ...WithCreateArgs, });
//   },
// })(component);
//
// export const WithLogin = component => graphql(CreateUser, {
//   name: 'login',
//   props: ({ login, ownProps: { getUsers, findUser, createUser, }, ...WithLoginArgs }) => {
//     console.log('WithLoginArgs', WithLoginArgs);
//     return ({ login: chain({ login, findUser, createUser, }), ...WithLoginArgs, });
//   },
// })(component);
//
// export const LoginWithData = component =>
//   graphql(CreateUser, {
//         name: 'createUser',
//         props: ({ createUser, ...cArgs }) => ({ login: login(createUser), }),
//   })(component);
