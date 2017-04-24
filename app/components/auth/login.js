import React from 'react';
import { withApollo, } from 'react-apollo';
import { Field, reduxForm, reset, } from 'redux-form';
import Layout from 'material-ui/Layout';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { LoginChain, LoginWithData, } from './queries';

const resetForm = formID => (action, dispatch) => dispatch(reset(formID));

const styles = { display: 'inline-flex', };

const renderField = ({ input, meta: { error: e, }, ...rest }) => (
  <TextField type="text" inputProps={input} error={e} {...rest} />
  );

const baseLogin = ({ handleSubmit, }) => (
  <form onSubmit={handleSubmit} style={styles} >
    <Field name="username" component={renderField} />
    <Field name="password" type="password" component={renderField} />
    <Button accent type="submit">Login</Button>
  </form>
);

const ReduxLogin = reduxForm()(baseLogin);

const LoginForm = ({ login, exec, formID, ...rest }) => {
  console.log('rest', rest);
  return (
    <ReduxLogin
      form={formID} onSubmit={exec} onSubmitSuccess={resetForm(formID)}
    />
  );
};

export default LoginChain(withApollo(LoginForm));
