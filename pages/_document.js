import React, { Component, } from 'react';
import Document, { Head, Main, NextScript, } from 'next/document';
import flush from 'styled-jsx/server';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createPalette, { dark, } from 'material-ui/styles/palette';
import createMuiTheme from 'material-ui/styles/theme';
import { pink, teal, } from 'material-ui/styles/colors';
import Layout from 'material-ui/Layout';

// import NavBar from './navBar';
// import { ProductList, } from './products';
// import { Login, } from './auth';

const palette = createPalette({
  primary: teal,
  accent: pink,
  type: 'dark',
  ...dark,
});

const { styleManager, theme, } = MuiThemeProvider.createDefaultContext(
  { theme: createMuiTheme({ palette, }), });

const styles = { paddingTop: '3rem', };

//
// export default class Main extends Component {
//
//   render() {
//     console.log('this.props', this.props);
//     return (
//       <MuiThemeProvider theme={theme} styleManager={styleManager}>
//

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage, }) {
    const { html, head, } = renderPage();
    const styles = flush();
    
    return { html, head, styles, };
  }
  
  render () {
    return (
      <html>
        <Head>
          <title>Purchasr</title>
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <style>
            {`body {
            text-align: center;
            background-color:#303030;
            font-family: Roboto, sans-serif;
          }
          `}</style>
        </Head>
        <body id="root" className="custom_class">
          <MuiThemeProvider theme={theme} styleManager={styleManager}>
            
            <Layout container className="App" direction={'column'}>

              {this.props.customValue}
              <Main />
            </Layout>
          </MuiThemeProvider>
          <NextScript />
        </body>
      </html>
    );
  }
}
