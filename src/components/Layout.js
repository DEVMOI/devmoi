import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { initWeb3, init } from '@/actions';
import Navbar from './Navbar';
import Footer from './Footer';
import SideBar from './sidebar';
const Layout = (props) => {
  let { isFluid = false, classes, children, session, init } = props;
  useEffect(() => {
    init();
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
          height: 100%;
          overflow: scroll;
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .layout::-webkit-scrollbar {
          display: none;
        }
        .wrapper {
          height: calc(100% - 87px);
        }
        .main-show {
          width: 100%;
          max-width: calc(100% - 224px);
          margin-left: auto;
        }
        .main-hide {
          width: 100%;
          max-width: calc(100% - 88px);
          margin-left: auto;
        }
        .fnt-12,
        .fnt-size-12 {
          font-size: 12px;
        }
        .fnt-16,
        .fnt-size-16 {
          font-size: 1rem !important;
        }

        .fnt-24 {
          font-size: 1.5rem !important;
        }

        .fnt-32 {
          font-size: 2rem !important;
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
      <div
        className={`wrapper d-flex flex-column flex-sm-row px-2`}>
        <SideBar />
        <div className={`${session.showSidebar ? 'main-show' : 'main-hide'}`}>
          <main
            className={` pt-5 pb-3 ${
              isFluid ? 'container-fluid' : 'container' 
            } h-100 `}>
            {children}
          </main>
        </div>
      </div>
      <Footer
        footerContainerStyle={
          'd-flex flex-row px-2 w-100 border border-dark border-top'
        }
      />
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
