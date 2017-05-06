import React from 'react';
import Layout from 'material-ui/Layout';
import Button from 'material-ui/Button';
import Single from './single';
import { WithAll, } from '../containers';
import { CreateProductForm, } from './forms';
   
const ProductList = ({ products, byPrice, byStock, }) => (
  <Layout container row justify="center">
    <Layout item sm={8} >
      <CreateProductForm formID="createProduct" />
      <Button onClick={byPrice}>Sort by price</Button>
      <Button onClick={byStock}>Sort by stock</Button>
    </Layout>
    <Layout container sm={12}>
      {products.map(p =>
        <Layout item md={4} key={p.id}>
          <Single id={p.id} product={p} />
        </Layout>)}
    </Layout>
  </Layout>
    );

export default WithAll(ProductList);
