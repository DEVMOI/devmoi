import { connect } from 'react-redux';

function Footer(props) {
  const { footerContainerStyle, chainId } = props;

  function Network({ chainID }) {
    switch (chainID) {
      case 'main':
        return <span>Ethereum Main Network</span>;

      case 'ropsten':
        return <span>Ropsten Test Network</span>;

      case 'rinkeby':
        return <span>Rinkeby Test Network</span>;

      case 'goerli':
        return <span>Goerli Test Network</span>;

      case 'kovan':
        return <span>Kovan Test Network</span>;
      default:
        return <span>Custom Network</span>;
    }
  }

  return (
    <footer
      className={`footer pl-2 pt-2 ${
        footerContainerStyle !== undefined ? footerContainerStyle : ''
      }`}>
      <style jsx>{`
        .footer {
          height: 1.5625rem;
        }
        .chain {
          border: none;
          height: 0.75rem;
          width: 0.75rem;
          border-radius: 1.0625rem;
        }
        .0x1{
          background: rgb(41, 182, 175);

         }
        }
      `}</style>

      <span className={`chain ${chainId !== null ? chainId : '0x1'}`}>
        <Network chainID={chainId} />
      </span>
    </footer>
  );
}
const mapStateToProps = (state) => ({
  chainId: state.session.chainId,
});

export default connect(mapStateToProps)(Footer);
