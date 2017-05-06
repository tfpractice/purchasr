import React from 'react';
import { Field, } from 'redux-form';
import Button from 'material-ui/Button';
import { FormGroup, } from 'material-ui/Form';
import { LabelCheckbox, } from 'material-ui/Checkbox';
import { ClearForm, renderText, } from 'utils';
import { WithUnSell, } from '../containers';
import Layout from 'material-ui/Layout';

{ /* <form onSubmit={handleSubmit} >

  <Layout container>
    <Layout item sm={6}>
      <FormGroup row>
        <Field label="count" name="count" type="number" component={renderText} />
        <Field name="status" component="hidden" />

      </FormGroup>
    </Layout>
    <Layout item sm={6}>
      <FormGroup >
        <Button accent type="submit">AddToCart</Button>
        {unsell && <Button accent onClick={unsell}> remove from cart</Button>}
      </FormGroup>  </Layout>
  </Layout>
</form> */ }

//
//
// <form onSubmit={handleSubmit} >
//   <FormGroup row>
//     <FormGroup row>
//       <Field label="count" name="count" type="number" component={renderText} />
//       <Field name="status" component="hidden" />
//
//     </FormGroup>
//     <FormGroup >
//       <Button accent type="submit">AddToCart</Button>
//       {unsell && <Button accent onClick={unsell}> remove from cart</Button>}
//     </FormGroup>
//   </FormGroup>
// </form>

const baseSale = ({ handleSubmit, unsell, }) => (
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
        </FormGroup>                                                                                                                                                                                                                                        </Layout>
    </Layout>
  </form>
  );

const ReduxSale = ClearForm(baseSale);

const Sale = ({ buyProduct, sale, formID, unsell, currentUser, }) =>
(currentUser && <ReduxSale
  form={formID}
  unsell={unsell}
  initialValues={sale || { status: 'PENDING', }}
  onSubmit={buyProduct}
/>);

export const SaleForm = WithUnSell(Sale);
