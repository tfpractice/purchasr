import React from 'react';
import { Field, } from 'redux-form';
import { FormGroup, } from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { ClearForm, } from 'utils';
import { LoginChain, } from '../containers';

const styles = { display: 'inline-flex', };

const renderField = ({ input, meta: { error: e, }, ...rest }) => (
  <TextField type="text" inputProps={input} error={e} {...rest} />
  );

const baseLogin = ({ handleSubmit, }) => (
  <form onSubmit={handleSubmit} style={styles} >
    <FormGroup row>
      <Field name="username" component={renderField} />
      <Field name="password" type="password" component={renderField} />
    </FormGroup>
    <Button accent type="submit">Login</Button>
  </form>
);

const ReduxLogin = ClearForm(baseLogin);

const LoginForm = ({ login, formID, ...props }) => (
  <ReduxLogin
    form={formID} onSubmit={login}
  />
  );

export default LoginChain(LoginForm);
