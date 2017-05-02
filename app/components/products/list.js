import React from 'react';
import Layout from 'material-ui/Layout';
import Button from 'material-ui/Button';
import Single from './single';
import { WithAll, } from './containers';
import { CreateProductForm, } from './forms';
   
const ProductList = ({ products, byPrice, byStock, }) => (
  <Layout container>
    <Layout item sm={12} >
      <Button onClick={byPrice}>Sort by price</Button>
      <Button onClick={byStock}>Sort by stock</Button>
      <CreateProductForm formID="createProduct" />
    </Layout>
    {products.map(p =>
      <Layout item md={4} key={p.id}>
        <Single id={p.id} product={p} />
      </Layout>)}
  </Layout>
);

export default WithAll(ProductList);
