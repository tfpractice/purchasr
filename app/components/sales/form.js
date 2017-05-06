import React from 'react';
import { Field, } from 'redux-form';
import Button from 'material-ui/Button';
import { FormGroup, } from 'material-ui/Form';
import { LabelCheckbox, } from 'material-ui/Checkbox';
import { ClearForm, renderText, } from 'utils';
import { WithCreateSale, WithEditSale, WithSell, WithUnSell, } from '../containers';

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

const Sale = ({ buyProduct: createSale, formID, unsell, currentUser, ...props }) => {
  console.log('props', props);
  return (currentUser && <ReduxSale
    initialValues={{ status: 'PENDING', }} form={formID} unsell={unsell} onSubmit={createSale}
  />);
};

export const SaleForm = WithUnSell(Sale);
