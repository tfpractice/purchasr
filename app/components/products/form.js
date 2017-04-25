import React from 'react';
import { Field, reduxForm, reset, } from 'redux-form';
import Layout from 'material-ui/Layout';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import ProductCRUD, { WithCreateProduct, } from './queries';

const resetForm = formID => (action, dispatch) => dispatch(reset(formID));

const styles = { display: 'inline-flex', };

const renderField = ({ input, meta: { error: e, }, ...rest }) => (
  <TextField type="text" inputProps={input} error={e} {...rest} />
  );

const baseProduct = ({ handleSubmit, }) => (
  <form onSubmit={handleSubmit} style={styles} >
    <Field name="name" component={renderField} />
    <Field name="price" type="number" component={renderField} />
    <Button accent type="submit">Product</Button>
  </form>
);

const ReduxProduct = reduxForm()(baseProduct);

export const CreateForm = ({ createProduct, formID, ...rest }) => (
  <ReduxProduct
    form={formID} onSubmit={createProduct} onSubmitSuccess={resetForm(formID)}
  />);
export const CreateProductForm = WithCreateProduct(CreateForm);

const ProductForm = ({ login, login2, formID, ...rest }) => {
  console.log('rest', rest);
  return (
    <ReduxProduct
      form={formID} onSubmit={login} onSubmitSuccess={resetForm(formID)}
    />
  );
};

export default ProductCRUD(ProductForm);
