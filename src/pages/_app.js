import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { theme } from 'rimble-ui';
import { ThemeProvider } from 'styled-components';
import Head from 'next/head';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Layout } from '../components';
// pages/_app.js
export function reportWebVitals(metric) {
  console.log(metric);
}
// export async function getInitialProps({ Component, ctx }) {
//   let pageProps = {};

//   if (Component.getInitialProps) {
//     pageProps = await Component.getInitialProps(ctx);
//   }

//   return { pageProps };
// }
function MyApp({ Component, pageProps }) {
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
          {/* <ThemeProvider theme={theme}> */}
          <Layout
            isFluid={true}
            classes="h-100 border border-top-0 border-dark">
            <Component {...pageProps} />
          </Layout>
          {/* </ThemeProvider> */}
        </Provider>
      </div>
    </div>
  );
}

export default MyApp;
