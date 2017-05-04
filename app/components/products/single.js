import React from 'react';
import { Card, CardActions, CardContent, CardHeader, CardMedia, } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Text from 'material-ui/Typography';
import { EditProductForm, PurchaseForm, } from './forms';
import { WithUnPurchase, } from '../purchase';

const Product = ({ product, dropProduct, purchaseProduct, }) => {
  const a = 0;
  
  return (
    <Card raised>
      <CardHeader title={product.name} subheader={`$${product.price}`} />
      <CardMedia>
        <img src="http://placehold.it/150/ff00ff" alt="Contemplative Reptile" />
      </CardMedia>
      <CardContent>
        <EditProductForm formID={`edit:${product.id}`} id={product.id} />
        {product.description || product.stock }
      </CardContent>
      <CardActions >
        { purchaseProduct && <PurchaseForm product={product} formID={`purchase:${product.id}`} />}
        { dropProduct && <Button onClick={dropProduct}>Remove from cart</Button>}
      </CardActions>
    </Card>
  );
};

export default WithUnPurchase(Product);
