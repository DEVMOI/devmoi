import { connect } from 'react-redux';
import dynamic from 'next/dynamic';
import { FooterNavItem } from './common';
function Network({ chainID, textStyle }) {
  switch (chainID) {
    case 'main':
      return <span className={`${textStyle}`}>Ethereum Main Network</span>;

    case 'ropsten':
      return <span className={`${textStyle}`}>Ropsten Test Network</span>;

    case 'rinkeby':
      return <span className={`${textStyle}`}>Rinkeby Test Network</span>;

    case 'goerli':
      return <span className={`${textStyle}`}>Goerli Test Network</span>;

    case 'kovan':
      return <span className={`${textStyle}`}>Kovan Test Network</span>;
    default:
      return <span className={`${textStyle}`}>Custom Network</span>;
  }
}
function Footer(props) {
  const { footerContainerStyle, chainId } = props;

  return (
    <footer
      className={`footer fixed-bottom d-flex flex-row py-4 pl-2 align-items-center ${
        footerContainerStyle !== undefined ? footerContainerStyle : ''
      }`}>
      <style jsx>{`
        .footer {
          height: 1.5625rem;
          z-index:3;
          background:#fff;
        }
        .chain {
          border: none;
          height: 0.75rem;
          width: 5.75rem;
          border-radius: 1.0625rem;
        }
        .0x1{
          background: rgb(41, 182, 175);

         }
        }
      `}</style>

      <Network
        textStyle={`chain ${chainId !== null ? chainId : '0x1'}`}
        chainID={chainId}
      />
      <div className={`d-flex flex-column flex-sm-row ml-auto`}>
        <FooterNavItem Route={'/about'} Text={'About'} />
      </div>
    </footer>
  );
}
const mapStateToProps = (state) => ({
  chainId: state.session.chainId,
});
const _Footer = dynamic(() => Promise.resolve(Footer), {
  ssr: false,
});
export default connect(mapStateToProps)(_Footer);
