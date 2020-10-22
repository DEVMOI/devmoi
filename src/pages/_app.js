import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';

import Head from 'next/head';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Layout } from '../components';

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

          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <title>DevMoi</title>
        </Head>

        <div className="h-100">
          <Provider session={pageProps.session} store={store}>
            <Layout
              isFluid={true}
              classes="h-100 border border-top-0 border-dark">
              <Component {...pageProps} />
            </Layout>
          </Provider>
        </div>
      </div>
    );
  }
}

export default MyApp;
