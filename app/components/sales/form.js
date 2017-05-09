import React from 'react';
import { Field, } from 'redux-form';
import Button from 'material-ui/Button';
import { FormGroup, } from 'material-ui/Form';
import { LabelCheckbox, } from 'material-ui/Checkbox';
import { ClearForm, renderText, } from 'utils';
import { WithUnSell, } from '../containers';
import Grid from 'material-ui/Grid';
import Text from 'material-ui/Typography';

const baseSale = ({ handleSubmit, unsell, ...baseSaleProps }) => (
  <form onSubmit={handleSubmit} >
    <Grid container direction="column" justify="center">
      <Grid item sm={12}>
        <Field label="count" name="count" type="number" component={renderText} />
        <Field name="status" component="hidden" />
      </Grid>
      <Grid item sm={12}>
        <FormGroup row>
          <Button accent type="submit">AddToCart</Button>
          {unsell && <Button accent onClick={unsell}> remove from cart</Button>}
        </FormGroup>
      </Grid>
    </Grid>
  </form>
  );
const ReduxSale = ClearForm(baseSale);

const Sale = ({ buyProduct, sale, formID, unsell, currentUser, }) => (currentUser && <ReduxSale
  form={formID}
  unsell={unsell}
  onSubmit={buyProduct}
  initialValues={{
    status: (sale ? sale.status : 'PENDING'),
    count: (sale ? sale.count : 0),
  }}
/>
  );

export const SaleForm = WithUnSell(Sale);
