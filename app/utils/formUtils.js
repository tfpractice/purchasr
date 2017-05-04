import React from 'react';
import TextField from 'material-ui/TextField';
import { reduxForm, } from 'redux-form';

export const onSubmitSuccess = (res, dispatch, { reset, }) => reset();
export const ClearForm = form => reduxForm({ onSubmitSuccess, })(form);
export const renderText = ({ input, meta: { error: e, }, ...rest }) => (
  <TextField inputProps={input} error={e} {...rest} />
  );
