import React from 'react';
import Layout from 'material-ui/Layout';
import { List, ListItem, ListItemIcon, ListItemText, } from 'material-ui/List';
import { WithCurrent, } from '../auth';
import CartItem from './cartItem';

const Cart = ({ products, ...props }) => {
  console.log('Cart props', props);
  return (
    <List subheader={'Your Cart'}>
      {products.map(p =>
        <CartItem product={p} key={p.id} />
      )}
    </List>
  );
};

export default WithCurrent(Cart);
