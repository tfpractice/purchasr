import React from 'react';
import { Field, } from 'redux-form';
import Button from 'material-ui/Button';
import { FormGroup, } from 'material-ui/Form';
import { ClearForm, renderText, } from 'utils';
import { WithCreate, WithEdit, } from '../containers';

const baseProduct = ({ handleSubmit, destroyProduct, }) => (
  <form onSubmit={handleSubmit} >
    <FormGroup >
      <Field label="name" name="name" component={renderText} />
      <Field label="description" name="description" type="text" component={renderText} />

      <Field label="stock" name="stock" type="number" component={renderText} />
      <Field label="price" name="price" type="number" component={renderText} />
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
