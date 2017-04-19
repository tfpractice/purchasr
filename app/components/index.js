import { ProductList, } from './products';
export default ({ children, }) => (
  <main>
    <h1> Site loaded</h1>
    <ProductList />
    {children}
  </main>);
