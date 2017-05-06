import React from 'react';
import { Field, } from 'redux-form';
import Button from 'material-ui/Button';
import { FormGroup, } from 'material-ui/Form';
import { LabelCheckbox, } from 'material-ui/Checkbox';
import { ClearForm, renderText, } from 'utils';
import { WithUnSell, } from '../containers';

const baseSale = ({ handleSubmit, unsell, }) => (
  <form onSubmit={handleSubmit} >
    <FormGroup row>
      <Field label="count" name="count" type="number" component={renderText} />
      <Field name="status" component="hidden" />
      <Button accent type="submit">AddToCart</Button>
      {unsell && <Button accent onClick={unsell}> remove from cart</Button>}
    </FormGroup>
  </form>
  );

const ReduxSale = ClearForm(baseSale);

const Sale = ({ buyProduct, formID, unsell, currentUser, }) =>
(currentUser && <ReduxSale
  form={formID}
  unsell={unsell}
  initialValues={{ status: 'PENDING', }}
  onSubmit={buyProduct}
/>);

export const SaleForm = WithUnSell(Sale);
