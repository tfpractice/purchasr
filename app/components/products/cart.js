import React from 'react';
import Layout from 'material-ui/Layout';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from 'material-ui/List';
import CartItem from './cartItem';
import { WithUnPurchase, } from './containers';
import { CreateProductForm, } from './forms';
   
const Cart = ({ products, }) => (
  <List subheader={'Your Cart'}>
    {products.map(p =>
      <CartItem product={p} key={p.id} />
    )}
  </List>
);

export default (Cart);
