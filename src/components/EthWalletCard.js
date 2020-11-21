import { UserIcon } from '@/components/common';
import { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Slider, Input } from 'rimble-ui';

import dynamic from 'next/dynamic';

function EthWalletCard(props) {
  const [donationValue, setDonationValue] = useState(1);
  const [errorState, setErrorState] = useState('');
  const getQuote = async (coin, value) => {
    try {
      const response = await fetch(
        `https://api.0x.org/swap/v1/quote?buyToken=${coin}&sellToken=ETH&buyAmount=${web3.utils.toWei(
          `${value}`,
          'ether'
        )}`
      );
      return response;
    } catch (error) {
      setErrorState(JSON.stringify(error, null, 2));
    }
  };

  const donateEth = async (addr, value = 1) => {
    try {
      if (window.web3) {
        const response = await getQuote('DAI', value);
        if (response.ok) {
          let res = await response.json(),
            data = {};

          data.to = await addr;
          data.from = props.address;
          data.value = await res.value;
          await web3.eth.sendTransaction(data);
        } else {
          const error = await response.json();
          error.message ===
          'MetaMask Tx Signature: User denied transaction signature.'
            ? setErrorState('Transaction Cancelled')
            : setErrorState(error.message);
        }
      } else {
        setErrorState('Please Connect to MetaMask...');
      }
    } catch (err) {
      err.message ===
      'MetaMask Tx Signature: User denied transaction signature.'
        ? setErrorState('Transaction Cancelled')
        : setErrorState(error.message);
    }
  };

  return (
    <div title={props.seed} className="eth-wallet-card card border border-dark p-3 box-shadow">
      <style jsx>
        {`
          .eth-wallet-card {
            width: 25.7rem;
          }
        `}
      </style>
      {props.showIcon ? (
        <UserIcon seed={props.seed} />
      ) : (
        <p className={`${props.seed!==props.address?'text-truncate w-75':''}`}>{props.seed}</p>
      )}
      <p className={`text-uppercase`}>{props.role}</p>
      {props.seed !== props.address ? (
        <div className="d-flex flex-column">
          <div className="d-flex flex-row align-items-center mb-4">
            <span className="font-weight-bold text-uppercase mr-3">~</span>
            <Input
              type="number"
              required={true}
              placeholder="e.g. 123"
              value={donationValue}
              onChange={(e) =>
                e.target.value >= 1 && e.target.value <= 9999
                  ? setDonationValue(e.target.value)
                  : null
              }
            />
            <span className="font-weight-bold text-uppercase mx-3 ml-4">
              USD
            </span>
          </div>
          <button
            className="w-100 btn btn-outline-dark m-0 p-0 border border-top text-uppercase"
            onClick={() => {
              setErrorState('');
              donateEth(props.seed, donationValue);
            }}>
            Send
          </button>
        </div>
      ) : (
        <div></div>
      )}
      <pre id="error" />
      <span className={`text-uppercase`}>{errorState}</span>
    </div>
  );
}

const mapStateToProps = (state) => ({
  address: state.session.address,
});
const _EthWalletCard = connect(mapStateToProps)(EthWalletCard);
export default dynamic(() => Promise.resolve(_EthWalletCard), {
  ssr: false,
});
