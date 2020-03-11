// pages/_app.js
import App from "next/app";
import Head from "next/head";
import React from "react";

export default class MyApp extends App {
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
      <>
        <Head>
          <title>DevMoi</title>
        </Head>
        <style global jsx>{`
          html,
          body,
          #__next {
            height: 100%;
          }
        `}</style>
        <Component {...pageProps} />
      </>
    );
  }
}
