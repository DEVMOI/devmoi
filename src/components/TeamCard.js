import { UserIcon } from '@/components/common';
import { useEffect, useState, useRef } from 'react';
import { Slider, Input } from 'rimble-ui';
export default function TeamCard(props) {
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
      // await window.ethereum.enable();
      if (window.ethereum) {
        const response = await getQuote('DAI', value);
        if (response.ok) {
          setErrorState('');
          let res = await response.json(),
            data = {};

          data.to = await addr;
          data.from = await ethereum.selectedAdress;
          data.value = await res.value;
          data.gas = await res.gas;
          data.gasPrice = await res.gasPrice;
          await web3.eth.sendTransaction(data);
        } else {
          const error = await response.json();
          error.message ===
          'MetaMask Tx Signature: User denied transaction signature.'
            ? setErrorState('Transaction Cancelled')
            : null;
        }
      } else {
        setErrorState('Please Connect to MetaMask...');
      }
    } catch (err) {
      err.message ===
      'MetaMask Tx Signature: User denied transaction signature.'
        ? setErrorState('Transaction Cancelled')
        : null;
    }
  };

  return (
    <div title={props.seed} className="team-card border border-dark p-3">
      <style jsx>
        {`
          .team-card {
            width: 21.875rem;
          }
        `}
      </style>
      {props.showIcon ? (
        <UserIcon seed={props.seed} />
      ) : (
        <p className={`text-truncate w-75`}>{props.seed}</p>
      )}
      <p>{props.role}</p>
      <div className="d-flex flex-column">
        <div className="d-flex flex-row align-items-center mb-4">
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
            DAI/ETH
          </span>
        </div>
        {/* <Slider
        className={`my-3`}
          width="100%"
          min={'1'}
          max={'100'}
          step={'1'}
          value={donationValue}
          onChange={(e) =>
            e.target.value >= 1 ? setDonationValue(e.target.value) : null
          }
        /> */}
      </div>
      <button
        className="w-100 btn m-0 p-0 border border-top"
        onClick={() => {
          donateEth(props.seed, donationValue);
        }}>
        Donate
      </button>
      <pre id="error" />
      <span>{errorState}</span>
    </div>
  );
}
