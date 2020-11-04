import { UserIcon } from '@/components/common';
import { useEffect, useState, useRef } from 'react';
import RSSFeed from '@/components/RSSFeed';
import { Slider, Input } from 'rimble-ui';

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
        let data = await response.json();
        data.to = await addr;
        data.from = ethereum.selectedAdress;
        web3.eth.sendTransaction(data);
      }
    } else {
      const error = await response.json();
      document.getElementById('error').append(JSON.stringify(error, null, 2));
    }
  } catch (err) {
    window.alert('You need to install or enable Metamask');
  }
};

function TeamCard(props) {
  const [donationValue, setDonationValue] = useState(1);
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
          <span className="font-weight-bold text-uppercase mx-3 ml-4">DAI</span>
        </div>
        <Slider
          width="100%"
          min={'1'}
          max={'100'}
          step={'1'}
          defaultValue={donationValue}
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

const About = () => (
  <div className="d-flex flex-column align-items-center justify-content-center mx-auto h-100">
    <style jsx>
      {`
        .about-rss {
          height: 18.75rem;
          width: 50rem;
        }
      `}
    </style>

    <h1 className="display-3">DEVMOI</h1>
    <h5>A Community of Developers and Content Creators.</h5>
    <br />
    <a className="mb-5" href="https://discord.gg/DnbkrC8" target="_blank">
      <img
        className="border border-dark"
        src="https://img.shields.io/discord/687169639712686097?style=for-the-badge&logo=discord"
        alt="Discord Icon"
      />
    </a>
    <TeamCard
      seed={'0xa8d145dd3003817da1dc83f838ee5088b65acf2e'}
      role="Lead Developer"
    />
    <div className={'about-rss mt-5'}>
      <RSSFeed />
    </div>
  </div>
);

export default About;
