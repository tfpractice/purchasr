import React from 'react';
import { Card, CardActions, CardContent, CardHeader, CardMedia, } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Text from 'material-ui/Text';
import { EditProductForm, } from './form';

// import { createStyleSheet } from 'jss-theme-reactor';
// import customPropTypes from 'material-ui/utils/customPropTypes';
const Product = ({ product, }) => {
  const a = 0;
  
  return (
    <Card >
      <CardContent>
        <CardHeader title={product.name} subheader={`$${product.price}`} />
        <CardMedia>
          <img src="http://placehold.it/150/ff00ff" alt="Contemplative Reptile" />
        </CardMedia>
        <CardActions>
          <EditProductForm id={product.id} formID={`product:${product.id}`} />
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default (Product);

// const styleSheet = createStyleSheet('SimpleCard', (theme) => ({
//   card: { minWidth: 275 },
//   bullet: {
//     display: 'inline-block',
//     margin: '0 2px',
//     transform: 'scale(0.8)',
//   },
//   title: {
//     marginBottom: 16,
//     fontSize: 14,
//     color: theme.palette.text.secondary,
//   },
//   pos: {
//     marginBottom: 12,
//     color: theme.palette.text.secondary,
//   },
// }));
