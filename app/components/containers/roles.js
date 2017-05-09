import { spread, } from 'fenugreek-collections';
import { compose, graphql, } from 'react-apollo';
import { Role, } from 'modules';
import { viewNodes, } from 'utils';
import { WithCurrent, } from './auth';

const {
  actions: { addRole, dropRole, },
  queries: { GET_ROLES, DROP_ROLE, ADD_ROLE, },
} = Role;

export const WithRoles = component => WithCurrent(graphql(GET_ROLES, {
  skip: ({ currentUser, }) => !currentUser,
  props: ({ data, }) =>
    ({ roleData: data, roles: viewNodes(data), }),
})(component));

export const WithAddRole = component => compose(WithRoles)(graphql(ADD_ROLE, {
  skip: ({ roleId, }) => !currentUser || !roleId,
  props: ({ mutate, ownProps: { roleId, currentUser, }, }) =>
    ({ addRole: () => addRole(mutate)(currentUser.id)(roleId), }),
})(component));

export const WithDropRole = component => WithAddRole(graphql(DROP_ROLE, {
  skip: ({ roleId, currentUser, }) => !currentUser || !roleId,
  props: ({ mutate, ownProps: { roleId, currentUser, }, }) =>
    ({ dropRole: () => dropRole(mutate)(currentUser.id)(roleId), }),
})(component));

export const LoginChain = component => WithFindAndLogin(component);
