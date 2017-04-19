import React from 'react';
import { graphql, } from 'react-apollo';
import Single from './single';
import allProducts from './query';

const dataToProps = ({ data, }) => ({
 data,
 products: data.viewer.allProducts.edges.map(({ node, }) => node),
});
   
const ProductList = ({ data, products, }) => (
  <section>
    <ul>
      <h1>I am the Productlist</h1>
      {products.map(p => <Single product={p} key={p.id} />)}
    </ul>
  </section>
  );

export default graphql(allProducts, { props: dataToProps, })(ProductList);
