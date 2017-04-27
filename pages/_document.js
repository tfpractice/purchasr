import React from 'react';
import Document, { Head, Main, NextScript, } from 'next/document';
import flush from 'styled-jsx/server';
import injectTapEventPlugin from 'react-tap-event-plugin';

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage, }) {
    const { html, head, } = renderPage();

    return { html, head, styles: flush(), };
  }
    
  render () {
    return (
      <html>
        <Head>
          <title>Purchasr</title>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <style>
            {`body {
            text-align: center;
            background-color:#303030;
            font-family: Roboto, sans-serif;
          `}</style>
        </Head>
        <body id="root" className="custom_class">
          {this.props.customValue}
          <Main />
          <NextScript />
        </body>
      </html>);
  }
}
