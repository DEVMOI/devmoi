import { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { isAuth, moiEthStatus, setAddress } from '@/actions';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = (props) => {
  let { isFluid = false, classes, children, session, isAuth } = props;

  return (
    <div className="layout">
      <style global jsx>{`
        html,
        body,
        #__next {
          height: 100%;
          font-family: monospace;
        }
        .layout,
        main {
          height: calc(100% - 81px);
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
      <Navbar/>
      <main
        className={`${isFluid ? 'container-fluid' : 'container'} ${
          classes !== undefined ? classes : null
        }`}>
        {children}
      </main>
      <Footer/>
    </div>
  );
};
const mapStateToProps = (state) => ({
  session: state.session,
});
export default connect(mapStateToProps, { isAuth, moiEthStatus, setAddress })(
  Layout
);
