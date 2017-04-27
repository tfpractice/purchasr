import React from 'react';
import { Field, reduxForm, reset, } from 'redux-form';
import Layout from 'material-ui/Layout';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { WithCreate, WithEdit, } from './containers';

const styles = { display: 'inline-flex', };
const renderField = ({ input, meta: { error: e, }, ...rest }) => (
  <TextField type="text" inputProps={input} error={e} {...rest} />
  );

const baseProduct = ({ handleSubmit, destroyProduct, }) => (
  <form onSubmit={handleSubmit} style={styles} >
    <Field name="name" component={renderField} />
    <Field name="price" type="number" component={renderField} />
    <Button accent type="submit">Submit Product</Button>
    {destroyProduct && <Button onClick={destroyProduct}>Destroy </Button>}
  </form>);

const onSubmitSuccess = (res, dispatch, { reset, }) => reset();
const ReduxProduct = reduxForm({ onSubmitSuccess, })((baseProduct));

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
