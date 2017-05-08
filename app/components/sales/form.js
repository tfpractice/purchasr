import React from 'react';
import { Field, } from 'redux-form';
import Button from 'material-ui/Button';
import { FormGroup, } from 'material-ui/Form';
import { LabelCheckbox, } from 'material-ui/Checkbox';
import { ClearForm, renderText, } from 'utils';
import { WithUnSell, } from '../containers';
import Layout from 'material-ui/Layout';
import Text from 'material-ui/Typography';

const baseSale = ({ handleSubmit, unsell, ...baseSaleProps }) => (
  <form onSubmit={handleSubmit} >
    <Layout container direction="column" justify="center">
      <Layout item sm={12}>
        <Field label="count" name="count" type="number" component={renderText} />
        <Field name="status" component="hidden" />
      </Layout>
      <Layout item sm={12}>
        <FormGroup row>
          <Button accent type="submit">AddToCart</Button>
          {unsell && <Button accent onClick={unsell}> remove from cart</Button>}
        </FormGroup>
      </Layout>
    </Layout>
  </form>
  );
const ReduxSale = ClearForm(baseSale);

const Sale = ({ buyProduct, sale, formID, unsell, product, currentUser, }) =>
(currentUser && <ReduxSale
  form={formID}
  unsell={unsell}
  initialValues={sale || { status: 'PENDING', }}
  onSubmit={buyProduct}
/>
);

export const SaleForm = WithUnSell(Sale);
