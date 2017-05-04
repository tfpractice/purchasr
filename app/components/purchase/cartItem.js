import React from 'react';
import { Card, CardActions, CardContent, CardHeader, CardMedia, } from 'material-ui/Card';
import { List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText,
} from 'material-ui/List';
import { Checkbox, } from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import Text from 'material-ui/Typography';

import { PurchaseForm, } from './form';
import { WithUnPurchase, } from '../containers';

const CartItem = ({ product, dropProduct, purchaseProduct, ...props }) => {
  console.log('props', props);
  return (
    <ListItem dense button key={product.id} divider>
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src={'http://placehold.it/150/ff00ff'} />
      </ListItemAvatar>
      <ListItemText primary={product.name} secondary={(product.price)} />
      <ListItemSecondaryAction>
        { purchaseProduct && <PurchaseForm product={product} formID={`purchase:${product.id}`} />}
        { dropProduct && <IconButton>
          <DeleteIcon onClick={dropProduct} />
        </IconButton>}
      </ListItemSecondaryAction>
    </ListItem>

  );
};

export default WithUnPurchase(CartItem);
