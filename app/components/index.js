import React from 'react';
import { ProductList, } from './products';
import { Login, } from './auth';
export default ({ children, }) => (
  <main>
    <h1> Site loaded</h1>
    {/* <Login formID="mainLogin" /> */}
    <ProductList />
    {children}
  </main>);
