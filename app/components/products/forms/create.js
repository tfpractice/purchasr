import React from 'react';
import { Field, } from 'redux-form';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import { FormGroup, } from 'material-ui/Form';
import { ClearForm, renderText, } from 'utils';
import { WithCreate, WithEdit, } from '../../containers';

const baseProduct = ({ handleSubmit, destroyProduct, }) => (
  <form onSubmit={handleSubmit} >
    <Field label="name" name="name" component={renderText} />
    <Field label="description" name="description" type="textarea" component={renderText} />
    <Grid container>
      <Grid item sm={6}>
        <Field label="stock" name="stock" type="number" component={renderText} />
      </Grid>
      <Grid item sm={6}>
        <Field label="price" name="price" type="number" component={renderText} />
      </Grid>
    </Grid>
    <FormGroup row>
      <Button accent type="submit">Submit Product</Button>
      {destroyProduct && <Button onClick={destroyProduct}>Destroy </Button>}
    </FormGroup>
  </form>
  );

const ReduxProduct = ClearForm(baseProduct);

export const CreateForm = ({ createProduct, formID, }) => (
  <ReduxProduct
    form={formID} onSubmit={createProduct}
  />);

const ProductForm = ({ updateProduct, destroyProduct, formID, ...props }) => (
  <ReduxProduct
    form={formID} onSubmit={updateProduct} destroyProduct={destroyProduct}
  />);

export const EditProductForm = WithEdit(ProductForm);
export const CreateProductForm = WithCreate(CreateForm);
