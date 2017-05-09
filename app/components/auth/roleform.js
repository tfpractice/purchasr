import React from 'react';
import { Field, } from 'redux-form';
import { FormGroup, } from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { ClearForm, } from 'utils';
import { WithAddRole, WithRoles, } from '../containers';
import { LabelCheckbox, } from 'material-ui/Checkbox';
const styles = { display: 'inline-flex', };

const renderField = ({ ...rest }) => {
  console.log('renderFieldrole ', rest, );
  return (
    <LabelCheckbox {...rest} />
  );
};
  
{ /* <LabelCheckbox
        checked={this.state.checkedA}
        onChange={(event, checked) => this.setState({ checkedA: checked, })}
        label="Option A"
        value="checkedA"
/>; */ }
const baseRole = ({ handleSubmit, roles, }) => {
  console.log('roleprops', roles);
  return (
  
    <form onSubmit={handleSubmit} style={styles} >
      <ul><h1>IMA THE ROLES</h1></ul>
      <FormGroup row>

        {roles.map(role =>
          <Field name={role.name} key={role.id} value={role.id} component={renderField} />
        )}
      </FormGroup>

      <Button accent type="submit">Role</Button>
    </form>
  );
};
const baseButton = ({ role, roleId, addRole, }) =>
  <Button onClick={addRole}>{role.name}</Button>;

const RoleButton = WithAddRole(baseButton);
const ReduxRole = ClearForm(baseRole);

const RoleForm = ({ roles, formID, ...props }) => {
  console.log('props', props);
  const ival = {};

  roles.forEach(({ id, name, }) => ival[name] = id);
  return (<Grid container >
    {roles.map(role => <RoleButton role={role} key={role.id} roleId={role.id} />)}
    <ReduxRole
      form={formID} roles={roles} onSubmit={(...args) => console.log('args', args)}
    />
  </Grid>
  );
};

export default WithRoles(RoleForm);
