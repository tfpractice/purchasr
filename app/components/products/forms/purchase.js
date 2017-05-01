import React from 'react';
import { Field, } from 'redux-form';
import Button from 'material-ui/Button'; import { FormGroup, } from 'material-ui/Form';

import { ClearForm, renderText, } from 'utils';
import { WithUnPurchase, } from '../containers';

const basePurchase = ({ handleSubmit, }) => (
  <form onSubmit={handleSubmit} >
    <FormGroup row>
      <Field label="quantity" name="quantity" type="number" component={renderText} />
      <Button accent type="submit">AddToCart</Button>
    </FormGroup>
  </form>
  );

const ReduxPurchase = ClearForm(basePurchase);

const Purchase = ({ purchaseProduct, formID, }) => (
  <ReduxPurchase
    form={formID} onSubmit={(...args) => { console.log('args', args); purchaseProduct(); }}
  />);

export const PurchaseForm = WithUnPurchase(Purchase);
