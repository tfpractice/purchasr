import React from 'react';
import { WithProduct, } from './containers';

// import ProductCRUD from './queries';

const Product = (props, ...SingleProductProps) => {
  const a = 0;

  console.log('SingleProductProps', props, SingleProductProps);
  return (
    <div>
      <h1>{props.product.name}</h1>
      <h1>{props.product.price}</h1>
    </div>
  );
};

export default (Product);
