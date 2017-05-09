import { spread, } from 'fenugreek-collections';
import { compose, graphql, } from 'react-apollo';
import { Role, } from 'modules';
import { viewNodes, } from 'utils';
import { WithCurrent, } from './auth';

const {
  actions: { addRole, dropRole, updateRole, },
  queries: { GET_ROLES, DROP_ROLE, ADD_ROLE, },
} = Role;

export const WithRoles = component => graphql(GET_ROLES, {
  props: ({ data, }) =>
    ({ roleData: data, roles: viewNodes(data), }),
})(component);

export const WithNewRoles = component => compose(WithCurrent, WithRoles)(graphql(GET_ROLES, {
  options: ({ currentUser: { id, }, ...props }) => {
    console.log('WithNewRolesOPTIONS', id, props);

    // roleData.refetch({ variables: { where: { members: { node: { id: { ne: id, }, }, }, }, }, });
    return ({});
  },
  skip: ({ currentUser, }) => !currentUser,
  props: (props) => {
    console.log('WithNewRolesdata', props.data);
    console.log('WithNewRolesrest', props);

    return ({ roleData: props.data, roles: viewNodes(props.data), });
  },
})(component));

export const WithAddRole = component => WithNewRoles(graphql(ADD_ROLE, {
  skip: ({ roleId, currentUser, }) => !currentUser,
  props: ({ mutate, ownProps: { roleId, currentUser, }, }) =>
    ({ addRole: () => updateRole(mutate)(currentUser.id)(roleId), }),
})(component));

export const WithDropRole = component => (graphql(DROP_ROLE, {
  skip: ({ roleId, currentUser, }) => !currentUser || !roleId,
  props: ({ mutate, ownProps: { roleId, currentUser, }, }) =>
    ({ dropRole: () => dropRole(mutate)(currentUser.id)(roleId), }),
})(component));
