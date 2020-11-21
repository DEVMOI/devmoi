import { useState, useEffect } from 'react';
import { Slider, Input, Card, Link, Button } from 'rimble-ui';
import dynamic from 'next/dynamic';
import { getQuote } from '../lib';
import transakSDK from '@transak/transak-sdk';

import SwaprCard from '@/components/Swaprcard';
import { connect } from 'react-redux';

function Swap(props) {
  const [page, setPageState] = useState(0);
  const [token, setTokenState] = useState([]);
  const [errorState, setErrorState] = useState('');
  useEffect(async () => {
    getTokens();
  }, []);
  useEffect(() => {
    let transak = new transakSDK({
      apiKey: process.env.TRANSAK_KEY, // Your API Key
      environment: process.env.NODE_ENV, // STAGING/PRODUCTION
      defaultCryptoCurrency: 'ETH',
      walletAddress: props.address, // Your customer's wallet address
      themeColor: '000000', // App theme color
      fiatCurrency: 'USD', // INR/GBP
      email: '', // Your customer's email address
      redirectURL: '',
      hostURL: window.location.origin,
      widgetHeight: '550px',
      widgetWidth: '450px',
    });

    // transak.init();

    // To get all the events
    transak.on(transak.ALL_EVENTS, (data) => {
      console.log(data);
    });

    // This will trigger when the user marks payment is made.
    transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
      console.log(orderData);
      transak.close();
    });
  }, []);
  async function getTokens() {
    try {
      fetch(`https://api.0x.org/swap/v1/tokens`).then(async (res) => {
        let tokens = await res.json();

        let i = 0;
        let row = 1;
        const rowSize = 6;
        let tokensArray = [];
        let tokensGroupArray = [];
        await tokens.records
          .filter(
            ({ symbol }) =>
              symbol !== 'ETH' &&
              symbol !== 'GNT' &&
              symbol !== 'AION' &&
              symbol !== 'MLN' &&
              symbol !== 'ICN' &&
              symbol !== 'CREP' &&
              symbol !== 'ICX' &&
              symbol !== 'GUSD' &&
              symbol !== 'SWUSD' &&
              symbol !== 'YBCRV' &&
              symbol !== 'YUSDC' &&
              symbol !== 'YUSDT' &&
              symbol !== 'YTUSD'
          )
          .map((researcher, key) => {
            if (tokensArray.length == rowSize) {
              tokensGroupArray.push(tokensArray);
              tokensArray = [];
            }
            if (
              tokens.records.length == key + 1 &&
              !tokensArray.includes(researcher)
            ) {
              tokensArray.push(researcher);
              tokensGroupArray.push(tokensArray);
            } else {
              tokensArray.push(researcher);
            }
          });
        await setTokenState(tokensGroupArray);
      });
    } catch (error) {
      setErrorState(JSON.stringify(error, null, 2));
    }
  }

  return (
    <div className="d-flex flex-row flex-wrap justify-content-around pb-5">
      <style global jsx>
        {`
          .swap-card {
            width: 100%;
          }
        `}
      </style>
      <Card
        // className="swap-card d-flex flex-column"
        p={5}
        m={2}
        width={'100%'}
        maxWidth={'420px'}>
        <p className="h4">
          All Coin Swaps are handled by the{' '}
          <Link href={'https://0x.org/'} fontSize={3} target={'_blank'}>
            0x API
          </Link>
          .
        </p>
      </Card>
      <Card
        // className="swap-card d-flex flex-column"
        p={5}
        m={2}
        width={'100%'}
        maxWidth={'420px'}>
        <span id={'moonpay_widget'} />
      </Card>
      {/* {token.forEach((group, key) => ( */}
      <div className="d-flex flex-row flex-wrap justify-content-center">
        {token[page] !== undefined
          ? token[page].map(({ symbol, name, decimals }, key) => (
              <SwaprCard
                key={key}
                symbol={symbol}
                name={name}
                decimals={decimals}
                error={errorState}
                watcher={page}
              />
            ))
          : null}
      </div>
      <div className="d-flex flex-row mt-5 justify-content-around w-100">
        <Button
          onClick={() => {
            page !== 0 ? setPageState(page - 1) : null;
          }}>
          {' '}
          Previous{' '}
        </Button>
        <div className="my-3">{page + 1}</div>
        <Button
          onClick={() => {
            token.length !== page + 1 ? setPageState(page + 1) : null;
          }}>
          {' '}
          Next{' '}
        </Button>
      </div>
    </div>
  );
}
let mapStateToProps = (state) => ({
  address: state.session.address,
});
let _Swap = connect(mapStateToProps)(Swap);
export default dynamic(() => Promise.resolve(_Swap), {
  ssr: false,
});
