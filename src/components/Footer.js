import { connect } from 'react-redux';

function Footer(props) {
  const { footerContainerStyle } = props;

  function Network({ chainID }) {
    console.log(chainID);
    switch (chainID) {
      case '0x1':
        return <span>Ethereum Main Network</span>;
      case '0x3':
        return <span>Ropsten Test Network</span>;
      case '0x4':
        return <span>Rinkeby Test Network</span>;
      case '0x5':
        return <span>Goerli Test Network</span>;
      case '0x2a':
        return <span>Kovan Test Network</span>;
      default:
        return <span>Custom Network</span>;
    }
  }

  return (
    <footer
      className={`footer ${
        footerContainerStyle !== undefined ? footerContainerStyle : ''
      }`}>
      <style jsx>{`
        .footer {
          height: 25px;
        }
        .chain {
          border: none;
          height: 12px;
          width: 12px;
          border-radius: 17px;
        }
        .0x1{
          background: rgb(41, 182, 175);

         }
        }
      `}</style>
      <div className={`pl-2 pt-2`}>
        <span
          className={`chain ${
            props.chainId !== null ? props.chainId : '0x1'
          }`}></span>
        {props.chainId !== null && props.chainId !== undefined ? (
          <Network chainID={props.chainId} />
        ) : null}
      </div>
    </footer>
  );
}
const mapStateToProps = (state) => ({
  chainId: state.session.chainId,
});

export default connect(mapStateToProps)(Footer);
