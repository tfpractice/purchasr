import React from 'react';
import { Card, CardActions, CardContent, CardHeader, CardMedia, } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Text from 'material-ui/Text';
import { EditProductForm, } from './form';
import { WithPurchase, } from './containers';

const Product = ({ product, purchaseProduct, ...props }) => {
  const a = 0;
  
  return (
    <Card raised>
      <CardHeader title={product.name} subheader={`$${product.price}`} />
      <CardMedia>
        <img src="http://placehold.it/150/ff00ff" alt="Contemplative Reptile" />
      </CardMedia>
      <CardContent>
        <EditProductForm id={product.id} formID={`product:${product.id}`} />
      </CardContent>
      <CardActions >
        { purchaseProduct && <Button onClick={purchaseProduct}>Purchase</Button>}
      </CardActions>
    </Card>
  );
};

export default WithPurchase(Product);
