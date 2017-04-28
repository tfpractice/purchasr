import React from 'react';
import { Field, reduxForm, } from 'redux-form';
import Layout from 'material-ui/Layout';
import Card from 'material-ui/Card';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { FormGroup, } from 'material-ui/Form';
import { WithCreate, WithEdit, } from './containers';
import { ClearForm, onSubmitSuccess, } from 'utils';
const styles = { display: 'inline-flex', };

// style={styles}
// const onSubmitSuccess = (res, dispatch, { reset, }) => reset();

const renderField = ({ input, meta: { error: e, }, ...rest }) => (
  <TextField type="text" inputProps={input} error={e} {...rest} />
  );

const baseProduct = ({ handleSubmit, destroyProduct, }) => (
  <FormGroup onSubmit={handleSubmit} >
    <FormGroup row>
      <Field label="name" name="name" component={renderField} />
      <Field label="price" name="price" type="number" component={renderField} />
    </FormGroup>
    <Button accent type="submit">Submit Product</Button>
    {destroyProduct && <Button onClick={destroyProduct}>Destroy </Button>}
  </FormGroup>
  );

const ReduxProduct = reduxForm({ onSubmitSuccess, })((baseProduct));

// const ReduxProduct = ClearForm(baseProduct);

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
