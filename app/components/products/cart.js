import React from 'react';
import Layout from 'material-ui/Layout';
import { List, ListItem, ListItemIcon, ListItemText, } from 'material-ui/List';
import CartItem from './cartItem';
   
const Cart = ({ products, }) => (
  <List subheader={'Your Cart'}>
    {products.map(p =>
      <CartItem product={p} key={p.id} />
    )}
  </List>
);

export default (Cart);
