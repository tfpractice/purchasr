import React from 'react';
import Layout from 'material-ui/Layout';
import { List, ListItem, ListItemIcon, ListItemText, ListSubheader, } from 'material-ui/List';
import { WithCurrent, } from '../containers';
import CartItem from './cartItem';
import Text from 'material-ui/Typography';
import Button from 'material-ui/Button';

const total = sales =>
  sales.map(({ product: { price, }, count, }) => price * count)
    .reduce((p, next) => p + next, 0);
    
const Cart = ({ sales, ...props, currentUser, }) => {
  console.log('Cart products, props,purchases', props, sales);
  return (
    <List >
      <ListSubheader>
        <Text primary align="center" type="display1">{'Your Cart'}</Text>
      </ListSubheader>
      {sales.map(s => <CartItem sale={s} key={s.id} />)}
      <ListItem>
        <Layout container align="center" justify="space-between">
          <Layout item >
            <ListItemText
              primary={
                <Text secondary type="button">{'Total:'}</Text>}
            />

          </Layout>
          <Layout item>
            <ListItemText
              primary={
                <Text secondary type="button">{`$${total(sales)}`}</Text>}
            />
          </Layout>
          <Layout item >
            <Button primary>
              <Text align="center" type="button">checkout</Text>
            </Button>
          </Layout>
        </Layout>
      </ListItem>

    </List>
  );
};

export default WithCurrent(Cart);
