import { UserIcon } from '@/components/common';
import { useEffect, useState, useRef } from 'react';
import { Slider, Input } from 'rimble-ui';
export default function TeamCard(props) {
  const [donationValue, setDonationValue] = useState(1);

  const donateEth = async (addr, value = 1) => {
    try {
      await window.ethereum.enable();

      const response = await fetch(
        `https://api.0x.org/swap/v1/quote?buyToken=DAI&sellToken=ETH&buyAmount=${web3.utils.toWei(
          `${value}`,
          'ether'
        )}`
      );
      if (response.ok) {
        if (window.ethereum) {
          let res = await response.json(),
            data = {};

          data.to = await addr;
          data.from = await ethereum.selectedAdress;
          data.value = await res.value;
          data.gas = await res.gas;
          data.gasPrice = await res.gasPrice;
          await web3.eth.sendTransaction(data);
        }
      } else {
        const error = await response.json();
        await document
          .getElementById('error')
          .append(JSON.stringify(error, null, 2));
      }
    } catch (err) {
      await document
        .getElementById('error')
        .append(JSON.stringify(err, null, 2));
    }
  };

  return (
    <div title={props.seed} className="team-card border border-dark p-3">
      <style jsx>
        {`
          .team-card{
            200px;
          }
          `}
      </style>
      <UserIcon seed={props.seed} />
      <p>{props.role}</p>
      <div className="d-flex flex-column">
        <div className="d-flex flex-row align-items-center">
          <Input
            type="number"
            required={true}
            placeholder="e.g. 123"
            value={donationValue}
            onChange={(e) =>
              e.target.value >= 1 ? setDonationValue(e.target.value) : null
            }
          />
          <span className="font-weight-bold text-uppercase mx-3 ml-4">
            DAI/ETH
          </span>
        </div>
        <Slider
          width="100%"
          min={'1'}
          max={'100'}
          step={'1'}
          value={donationValue}
          onChange={(e) =>
            e.target.value >= 1 ? setDonationValue(e.target.value) : null
          }
        />
      </div>
      <button
        className="w-100 btn m-0 p-0 border border-top"
        onClick={() => {
          donateEth(props.seed, donationValue);
        }}>
        Donate
      </button>
      <pre id="error" />
    </div>
  );
}
