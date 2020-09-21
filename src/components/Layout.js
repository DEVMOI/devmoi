import { useEffect } from 'react';
import { connect } from 'react-redux';
import { setAddress } from '../actions';
import Navbar from './Navbar';

const Layout = (props) => {
  let { isFluid = false, classes, children } = props;
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
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
      ethereum.selectedAddress !== null
        ? props.setAddress(ethereum.selectedAddress)
        : null;
    }
  }, []);

  return (
    <div className="layout">
      <style global jsx>{`
        html,
        body,
        #__next {
          height: 100%;
        }
        .layout,
        main {
          height: calc(100% - 3.5625rem);
        }
        .fnt-size-12 {
          font-size: 12px;
        }
        .fnt-color-000 {
          color: #000 !important;
        }
        .list-style-none {
          list-style: none !important;
        }
        .text-decoration-none {
          text-decoration: none !important;
        }
      `}</style>
      <Navbar />
      <main
        className={`${isFluid ? 'container-fluid' : 'container'} ${
          classes !== undefined ? classes : null
        }`}>
        {children}
      </main>
    </div>
  );
};
export default connect(null, { setAddress })(Layout);
