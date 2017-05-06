import React from 'react';
import Layout from 'material-ui/Layout';
import { List, ListItem, ListItemIcon, ListItemText, } from 'material-ui/List';
import { WithCurrent, } from '../containers';
import CartItem from './cartItem';

const Cart = ({ sales, ...props }) => {
  console.log('Cart products, props,purchases', props, sales);
  return (
    <List subheader={'Your Cart'}>
      {sales.map(s => <CartItem sale={s} key={s.product.id} />
      )}
    </List>
  );
};

export default WithCurrent(Cart);
