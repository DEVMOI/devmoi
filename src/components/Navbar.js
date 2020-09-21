import { connect } from 'react-redux';
import { setAddress } from '../actions';
import DMButton from './DM-Button';

function Navbar(props) {
  function NavItem(props) {
    return (
      <li className="nav-item active">
        <a className="nav-link" href={props.Route}>
          {props.Text}
        </a>
      </li>
    );
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top border-bottom border-dark">
      <div className="container-md px-0">
        <a className="navbar-brand" href="/">
          DEVMOI
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <NavItem Route={'/activity'} Text={'Activity'} />
            <NavItem Route={'/projects'} Text={'Projects'} />
            <NavItem Route={'/live'} Text={'Live'} />
          </ul>
          {console.log(props.authReducer.address===null)}
          {props.authReducer.address === null ? (
            <DMButton
              onPress={() => {
                const isMetaMaskInstalled = () => {
                  //Have to check the ethereum binding on the window object to see if it's installed
                  const { ethereum } = window;
                  return Boolean(ethereum && ethereum.isMetaMask);
                };

                if (!isMetaMaskInstalled()) {
                  //If it isn't installed we ask the user to click to install it
                  console.log('Click here to install MetaMask!');
                } else {
                  //If it is installed we change our button text
                  ethereum
                    .request({ method: 'eth_requestAccounts' })
                    .then(() => {
                      console.log(
                        'Connected Adress:',
                        ethereum.selectedAddress
                      );
                      ethereum.selectedAddress !== null
                        ? props.setAddress(ethereum.selectedAddress)
                        : null;
                    });
                }
              }}>
              Login
            </DMButton>
          ) : (
            <span>{props.authReducer.address}</span>
          )}
        </div>
      </div>
    </nav>
  );
}
const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});
export default connect(mapStateToProps,{setAddress})(Navbar);
