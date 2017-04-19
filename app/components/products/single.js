import React from 'react';

const Product = ({ product, }) => (
  <div>
    <h1>{product.name}</h1>
    <h1>{product.price}</h1>
  </div>
);

export default Product;
