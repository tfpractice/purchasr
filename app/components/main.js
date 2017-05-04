import React, { Component, } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createPalette, { dark, } from 'material-ui/styles/palette';
import createMuiTheme from 'material-ui/styles/theme';
import { pink, teal, } from 'material-ui/styles/colors';
import Layout from 'material-ui/Layout';
import NavBar from './navBar';
import { ProductList, } from './products';

const palette = createPalette({
  primary: teal,
  accent: pink,
  type: 'dark',
  ...dark,
});

const { styleManager, theme, } = MuiThemeProvider.createDefaultContext(
  { theme: createMuiTheme({ palette, }), });

const styles = { paddingTop: '3rem', };

export default class Main extends Component {
  
  render() {
    const a = 0;

    // console.log('this.props', this.props);

    return (
      <MuiThemeProvider theme={theme} styleManager={styleManager}>
        <Layout container className="App" direction={'column'}>
          <Layout item xs={12}>
            <NavBar />
          </Layout>
          <Layout item xs={12} style={styles}>
            <ProductList />
            {this.props.children}
          </Layout>
        </Layout>
      </MuiThemeProvider>
    );
  }
}
