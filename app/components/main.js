import React from 'react';
import { ProductList, } from './products';
import { Login, } from './auth';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createPalette, { dark, } from 'material-ui/styles/palette';
import createMuiTheme from 'material-ui/styles/theme';
import { pink, teal, } from 'material-ui/styles/colors';
import Layout from 'material-ui/Layout';

const palette = createPalette({
  primary: teal,
  accent: pink,
  type: 'dark',
  ...dark,
});

const { styleManager, theme, } = MuiThemeProvider.createDefaultContext(
  { theme: createMuiTheme({ palette, }), });

const styles = { paddingTop: '3rem', };

export default ({ children, }) => (
  <MuiThemeProvider theme={theme} styleManager={styleManager}>
    <main>
      <h1> Site loaded</h1>
      {/* <Login formID="mainLogin" /> */}
      <ProductList />
      {children}
    </main>
  </MuiThemeProvider>
);
