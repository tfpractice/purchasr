import React from 'react';
import { Field, } from 'redux-form';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { FormGroup, } from 'material-ui/Form';
import { WithCreate, WithEdit, } from './containers';
import { ClearForm, onSubmitSuccess as OSS, } from 'utils';

const renderField = ({ input, meta: { error: e, }, ...rest }) => (
  <TextField type="text" inputProps={input} error={e} {...rest} />
  );

const baseProduct = ({ handleSubmit, destroyProduct, }) => (
  <form onSubmit={handleSubmit} >
    <FormGroup row>
      <Field label="name" name="name" component={renderField} />
      <Field label="quantity" name="quantity" type="number" component={renderField} />
      <Field label="price" name="price" type="number" component={renderField} />
    </FormGroup>
    <Button accent type="submit">Submit Product</Button>
    {destroyProduct && <Button onClick={destroyProduct}>Destroy </Button>}
  </form>
  );

const ReduxProduct = ClearForm(baseProduct);

export const CreateForm = ({ createProduct, formID, }) => (
  <ReduxProduct
    form={formID} onSubmit={createProduct}
  />);

const ProductForm = ({ updateProduct, destroyProduct, formID, }) => (
  <ReduxProduct
    form={formID} onSubmit={updateProduct} destroyProduct={destroyProduct}
  />);

export const EditProductForm = WithEdit(ProductForm);
export const CreateProductForm = WithCreate(CreateForm);
