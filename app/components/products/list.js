import React from 'react';
import { graphql, } from 'react-apollo';
import Single from './single';
import allProducts from './query';

const dataToProps = ({ data, ...rest }) => ({ data, products: data.viewer.allProducts.edges.map(({ node, }) => node), ...rest, });
const ProductList = ({ data, products, ...rest }) => (
  <section>
    <ul>
      <h1>I am the Productlist</h1>
      {products.map(p => <Single product={p} key={p.id} />)}
    </ul>
  </section>
  );

export default graphql(allProducts, { props: dataToProps, })(ProductList);
