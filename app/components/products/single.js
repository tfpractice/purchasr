import React from 'react';

// import ProductCRUD from './queries';

const Product = (props, ...other) => {
  const a = 0;

  return (
    <div>
      <h1>{props.product.name}</h1>
      <h1>{props.product.price}</h1>
    </div>
  );
};

export default (Product);
