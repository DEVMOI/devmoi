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
          html {
            height: calc(100% - 3.5625rem);
          }
          body,
          #__next,
          main {
            height: 100%;
          }
        `}</style>
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top border-bottom border-dark">
          <div className="container">
            <a className="navbar-brand" href="/">
              DEVMOI
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="/home">
                    Home <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/projects">
                    Projects
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/minecraft">
                    Minecraft
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Component {...pageProps} />
      </>
    );
  }
}
