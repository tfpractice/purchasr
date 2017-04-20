import React from 'react';
import { graphql, } from 'react-apollo';
import Single from './single';
import allProducts from './query';
import Layout from 'material-ui/Layout';
import { List, ListItem, ListSubheader, } from 'material-ui/List';
import Paper from 'material-ui/Paper';

const dataToProps = ({ data, }) => ({
 data,
 products: data.viewer.allProducts.edges.map(({ node, }) => node),
});
   
const ProductList = ({ products, }) => (
  <Paper>
    <List>
      <ListSubheader >
        I am the Productlist
      </ListSubheader>
      {products.map(p => <ListItem key={p.id}>
        <Single product={p} />
      </ListItem>)}
    </List>
  </Paper>
  );

export default graphql(allProducts, { props: dataToProps, })(ProductList);
