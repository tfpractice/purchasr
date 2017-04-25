import React from 'react';
import { graphql, } from 'react-apollo';
import Single from './single';
import Layout from 'material-ui/Layout';
import { List, ListItem, ListSubheader, } from 'material-ui/List';
import ProductCRUD, { WithAllProducts, } from './queries';
import Paper from 'material-ui/Paper';
import { CreateProductForm, } from './form';

const dataToProps = ({ data, }) => ({
 data,
 products: data.viewer.allProducts.edges.map(({ node, }) => node),
});
   
const ProductList = ({ products, }) => {
  console.log('product', products);
  return (
    <Paper>
      <CreateProductForm formID="createProduct" />
      <List>
        <ListSubheader >
          I am the Productlist
        </ListSubheader>
        {products.map(p => <ListItem key={p.id}>
          <Single product={p} id={p.id} />
        </ListItem>)}
      </List>
    </Paper>
  );
};

export default WithAllProducts(ProductList);
