import { useEffect } from 'react';
import { connect } from 'react-redux';
import { isAuth, moiEthStatus, setAddress } from '../actions';
import Navbar from './Navbar';

const Layout = (props) => {
  let {
    isFluid = false,
    classes,
    children,
    authReducer,
    isAuth,
    setAddress,
    moiEthStatus,
  } = props;
  let { eth_status } = authReducer;
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    isAuth();
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
      
      <main
        className={`${isFluid ? 'container-fluid' : 'container'} ${
          classes !== undefined ? classes : null
        }`}>
        {children}
      </main>
    </div>
  );
};
const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});
export default connect(mapStateToProps, { isAuth, moiEthStatus, setAddress })(
  Layout
);
