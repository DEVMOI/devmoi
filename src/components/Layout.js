import dynamic from 'next/dynamic';
import { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { initWeb3, init } from '@/actions';
import Navbar from './Navbar';

const Footer = dynamic(() => import('./Footer'), {
  ssr: false,
});
const Layout = (props) => {
  let { isFluid = false, classes, children, session, init } = props;
  useEffect(async () => {
    await init();
  }, []);
  return (
    <div className={`layout ${classes !== undefined ? classes : null}`}>
      <style global jsx>{`
        html,
        body,
        #__next {
          height: 100%;
          font-family: monospace;
          overflow: hidden;
        }
        .layout {
          height: calc(100% - 26px);
          overflow: scroll;p
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .layout::-webkit-scrollbar {
          display: none;
        }
        main {
          height: calc(100% - 26px);
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
      <main className={` py-5  ${isFluid ? 'container-fluid' : 'container'} `}>
        {children}
      </main>
      <br className="my-3" />
      <Footer footerContainerStyle={'border border-dark border-top'} />
    </div>
  );
};
const mapStateToProps = (state) => ({
  session: state.session,
});
const _Layout = dynamic(() => Promise.resolve(Layout), {
  ssr: false,
});

export default connect(mapStateToProps, { initWeb3, init })(_Layout);
