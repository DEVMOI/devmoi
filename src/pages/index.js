import { truncateAddress } from 'lib';
import dynamic from 'next/dynamic';
import { connect } from 'react-redux';

const Home = ({ address }) => (
  <div className="home container">
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
        <span title={`${address}`} className={`address text-truncate`}>
          {address !== null &&
          address !== undefined &&
          address.length !== 0 &&
          address[0] !== undefined ? (
            <strong>
              <u>{truncateAddress(Array.isArray(address)?address[0]:address)}</u>
            </strong>
          ) : (
            'To Devmoi'
          )}
        </span>
        ,
      </p>
      <p className={`text-capitalize fnt-size-16`}>
        This is a Portal into the world of Web3.
      </p>
      <p className={`text-capitalize fnt-size-16`}>
        an Experimental website utilizing various api to bring what web3 has to
        offer you.
      </p>
      {!(address !== null &&
      address !== undefined &&
      address.length !== 0 &&
      typeof address === 'string') ? (
        <div className="w-100 h-100">
          <p className={`text-capitalize fnt-size-16`}>
            To have a full experience,{' '}
            <strong>
              <u>Please connect your Ethereum wallet</u>
            </strong>{' '}
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-arrow-up-right-circle-fill"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.879 10.828a.5.5 0 1 1-.707-.707l4.096-4.096H6.5a.5.5 0 0 1 0-1h3.975a.5.5 0 0 1 .5.5V9.5a.5.5 0 0 1-1 0V6.732l-4.096 4.096z"
              />
            </svg>
          </p>
          <p className={`text-capitalize fnt-size-16`}>
            <i>
              or follow the on-boarding process using the instructions above.
            </i>
          </p>
        </div>
      ) : (
        <div />
      )}
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  address: state.session.address,
});

export default connect(mapStateToProps)(Home);
