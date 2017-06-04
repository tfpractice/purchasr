import React from 'react';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Single from './single';
import { WithAll, } from '../containers';
import { CreateProductForm, } from './forms';
   
const ProductList = ({ products, byPrice, byStock, }) => (
  <Grid container justify="center">
    <Grid item sm={8} >
      <CreateProductForm formID="createProduct" />
      <Button onClick={byPrice}>Sort by price</Button>
      <Button onClick={byStock}>Sort by stock</Button>
    </Grid>
    <Grid container >
      {products.map(p =>
        (<Grid item md={4} key={p.id}>
          <Single id={p.id} product={p} />
        </Grid>))}
    </Grid>
  </Grid>
    );

export default WithAll(ProductList);
