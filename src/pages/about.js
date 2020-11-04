import { UserIcon } from '@/components/common';
import RSSFeed from '@/components/RSSFeed';

const handleConversion = async (addr) => {
  try {
    await window.ethereum.enable();

    const response = await fetch(
      `https://api.0x.org/swap/v1/quote?buyToken=DAI&sellToken=ETH&buyAmount=1000000000000000000`
    );
    if (response.ok) {
      let data = await response.json();
      data.to = await addr;

      if (window.ethereum) {
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
  return (
    <div title={props.seed} className="border border-dark p-3">
      <UserIcon seed={props.seed} />
      <p>{props.role}</p>
      <button
        className="w-100 btn m-0 p-0 border border-top"
        onClick={() => {
          handleConversion(props.seed);
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
