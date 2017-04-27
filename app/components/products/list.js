import React from 'react';
import Layout from 'material-ui/Layout';
import Single from './single';
import { WithAll, } from './containers';
import { CreateProductForm, } from './form';
   
const ProductList = ({ products, }) => (
  <Layout container>
    <CreateProductForm formID="createProduct" />
    {products.map(p =>
      <Layout item md={4} key={p.id}>
        <Single product={p} />
      </Layout>)}
  </Layout>
);

export default WithAll(ProductList);
