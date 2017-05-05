import React from 'react';
import { Field, } from 'redux-form';
import Button from 'material-ui/Button';
import { FormGroup, } from 'material-ui/Form';
import { LabelCheckbox, } from 'material-ui/Checkbox';
import { ClearForm, renderText, } from 'utils';
import { WithCreateSale, } from '../containers';

// const { DOM: { input, select, textarea, }, } = React;

const baseSale = ({ handleSubmit, }) => (
  <form onSubmit={handleSubmit} >
    <FormGroup row>
      <Field label="count" name="count" type="number" component={renderText} />
      <Field name="status" component="hidden" />
      <Button accent type="submit">AddToCart</Button>
    </FormGroup>
  </form>
  );

const ReduxSale = ClearForm(baseSale);

const Sale = ({ createSale, formID, currentUser, }) =>
(currentUser && <ReduxSale
  initialValues={{ status: 'PENDING', }} form={formID} onSubmit={createSale}
/>);

export const SaleForm = WithCreateSale(Sale);
