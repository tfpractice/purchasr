import React from 'react';
import { Card, CardActions, CardContent, CardHeader, CardMedia, } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Text from 'material-ui/Typography';
import { EditProductForm, } from './forms';
import { PurchaseForm, } from '../purchase';
import { SaleForm, } from '../sales';
import { WithProduct, } from '../containers';

const Product = ({ product, ...props }) => {
  const a = 0;

  console.log('Productprops', props, product);
  
  return (
    <Card raised>
      <CardHeader title={product.name} subheader={`$${product.price} || ${product.stock}`} />
      <CardMedia>
        <img src="http://placehold.it/150/ff00ff" alt="Contemplative Reptile" />
      </CardMedia>
      <CardContent>
        <Text>{product.description }</Text>
        <EditProductForm formID={`edit:${product.id}`} id={product.id} />
      </CardContent>
      <CardActions >
        {<SaleForm product={product} formID={`purchase:${product.id}`} />}
      </CardActions>
    </Card>
  );
};

export default WithProduct(Product);
