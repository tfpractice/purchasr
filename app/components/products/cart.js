import React from 'react';
import Layout from 'material-ui/Layout';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from 'material-ui/List';
import Single from './single';
import { WithUnPurchase, } from './containers';
import { CreateProductForm, } from './forms';
   
const Cart = ({ products, }) => (
  <List container>
    {products.map(p =>
      <ListItem key={p.id}>
        <Single product={p} />
      </ListItem>)}
  </List>
);

export default (Cart);
