import React from 'react';
import Layout from 'material-ui/Layout';
import { List, ListItem, ListItemIcon, ListItemText, } from 'material-ui/List';
import { WithCurrent, } from '../containers';
import CartItem from './cartItem';

const Cart = ({ ...props, purchases, }) => {
  console.log('Cart products, props,purchases', props, purchases);
  return (
    <List subheader={'Your Cart'}>
      {purchases.map(p =>
        <CartItem product={p.product} key={p.product.id} />
      )}
    </List>
  );
};

export default WithCurrent(Cart);
