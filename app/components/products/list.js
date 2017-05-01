import React from 'react';
import Layout from 'material-ui/Layout';
import Button from 'material-ui/Button';
import Single from './single';
import { WithAll, } from './containers';
import { CreateProductForm, } from './forms';
   
const ProductList = ({ products, byPrice, byStock, }) => (
  <Layout container>
    <Button onClick={byPrice}>Sort by price</Button>
    <Button onClick={byStock}>Sort by stock</Button>
    <CreateProductForm formID="createProduct" />
    {products.map(p =>
      <Layout item md={4} key={p.id}>
        <Single product={p} />
      </Layout>)}
  </Layout>
);

export default WithAll(ProductList);
