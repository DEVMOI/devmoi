import { truncateAddress } from 'lib';
import dynamic from 'next/dynamic';
import { connect } from 'react-redux';
const UserInfo = dynamic(() => import('@/components/UserInfo'), { ssr: false });



const Home = ({ address }) => (
  <div className="home">
    <style jsx>
      {`
        .address {
          width: 100px;
        }
      `}
    </style>

    <div>
      <p className={`h3 text-capitalize`}>
        Welcome{' '}
        <span className={`address text-truncate`}>
          {address !== null &&
          address !== undefined &&
          address.length !== 0 &&
          typeof address === 'string'
            ? truncateAddress(address)
            : 'To Devmoi'}
        </span>
        ,
      </p>
      <p className={`text-capitalize fnt-size-16`}>
        A Portal into the world of Web3.
      </p>
      <p className={`text-capitalize fnt-size-16`}>
        Currently an Experimental Site utilizing various api to bring what web3
        has to offer to you.
      </p>
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  address: state.session.address,
});

export default connect(mapStateToProps)(Home);
