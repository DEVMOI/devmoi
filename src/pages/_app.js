import App from 'next/app';
import React from 'react';
import {  Provider } from 'react-redux';
import { store } from '../store';

import Head from 'next/head';

import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import _web3 from 'web3';
import Navbar from '../components/Navbar';


class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }
  
  render() {
    const { Component, pageProps } = this.props;

    return (
      <div className="h-100">
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
            key="viewport"
          />
          <link rel="stylesheet" href={bootstrap} />
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <title>DevMoi</title>
        </Head>

        <div className="h-100">
          <Provider store={store}>
            <Navbar/>
            <Component {...pageProps} />
          </Provider>
        </div>
      </div>
    );
  }
}

export default(MyApp);
