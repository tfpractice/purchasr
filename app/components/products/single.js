import React from 'react';
import ProductCRUD from './queries';

const Product = (props, ...other) => {
  console.log('props', props, other);
  return (
    <div>
      <h1>{props.product.name}</h1>
      <h1>{props.product.price}</h1>
    </div>
  );
};

export default ProductCRUD(Product);
