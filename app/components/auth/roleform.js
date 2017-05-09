import React from 'react';
import { Field, } from 'redux-form';
import { FormGroup, } from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { LabelCheckbox, } from 'material-ui/Checkbox';
import { ClearForm, } from 'utils';
import { WithAddRole, WithNewRoles, WithRoles, } from '../containers';

const baseButton = ({ role, roleId, addRole, }) =>
  <Button onClick={addRole}>{role.name}</Button>;

const RoleButton = WithAddRole(baseButton);

const RoleForm = ({ roles, formID, roleData, ...props }) => {
  console.log('RoleFormrops', props);
  const ival = {};

  return (<Grid container >
    <p>roles</p>
    {roles.map(role => <RoleButton role={role} key={role.id} roleId={role.id} />)}

  </Grid>
  );
};

export default WithNewRoles(RoleForm);
