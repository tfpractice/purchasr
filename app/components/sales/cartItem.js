import React from 'react';
import { Card, CardActions, CardContent, CardHeader, CardMedia, } from 'material-ui/Card';
import List, { ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText,
} from 'material-ui/List';
import { Checkbox, } from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import Text from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { SaleForm, } from './form';
import { WithUnSell, } from '../containers';

const CartItem = ({ sale, }) => {
  console.log('CartItemsale', sale);
  return (
    <ListItem divider>
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src={'http://placehold.it/150/ff00ff'} />
      </ListItemAvatar>
      <Grid>
        <Text type="subheading" secondary>{sale.product.name}</Text>
        <ListItemText
          primary={<SaleForm sale={sale} product={sale.product} formID={`sale:${sale.id}`} />
        }
        />
      </Grid>
    </ListItem>

  );
};

export default (CartItem);
